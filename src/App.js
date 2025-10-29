import './App.css';
import { useState, useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope, set } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import { MyTunes } from './my-tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DrumSequencer from './components/drums/drum-sequencer';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function SetupButtons() {

    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
    document.getElementById('process').addEventListener('click', () => {
        Proc()
    }
    )
    document.getElementById('process_play').addEventListener('click', () => {
        if (globalEditor != null) {
            Proc()
            globalEditor.evaluate()
        }
    }
    )
}

export function Proc(
        // global settings
        steps, BPM, 
        // drums
        dPlay, dBank, dFast, dGain,
        bdStruct, hhStruct, sdStruct, rimStruct, ohStruct, ltStruct, mtStruct, htStruct, rdStruct, crStruct
    ) {
    const tuneText = MyTunes({
        // global settings
        steps, BPM, 
        // drums
        dPlay, dBank, dFast, dGain,
        bdStruct, hhStruct, sdStruct, rimStruct, ohStruct, ltStruct, mtStruct, htStruct, rdStruct, crStruct
    });

    globalEditor.setCode(tuneText);
}


export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}

export default function() {

    const handleProc = () => {
        Proc(
            // global settings
            steps, BPM, 
            // drums
            dPlay, dBank, dFast, dGain,
            bdStruct, hhStruct, sdStruct, rimStruct, ohStruct, ltStruct, mtStruct, htStruct, rdStruct, crStruct
        );
    };

    const handleProcAndPlay = () => {
    if (globalEditor && globalEditor.repl.state.started) {
        handleProc();
        globalEditor.evaluate();
    }
    };

    const hasRun = useRef(false);

    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
                //init canvas
                const canvas = document.getElementById('roll');
                canvas.width = canvas.width * 2;
                canvas.height = canvas.height * 2;
                const drawContext = canvas.getContext('2d');
                const drawTime = [-2, 2]; // time window of drawn haps
                globalEditor = new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById('editor'),
                    drawTime,
                    onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                    prebake: async () => {
                        initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                        const loadModules = evalScope(
                            import('@strudel/core'),
                            import('@strudel/draw'),
                            import('@strudel/mini'),
                            import('@strudel/tonal'),
                            import('@strudel/webaudio'),
                        );
                        await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                    },
                });
                
            document.getElementById('proc').value = stranger_tune
            SetupButtons()
            Proc()
        }

    }, []);



    // global settings
    const [steps, setSteps] = useState(4);
    const [BPM, setBPM] = useState(60)

    // drums
    const [hhStruct, setHhStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [ohStruct, setOhStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [sdStruct, setSdStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [rimStruct, setRimStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [ltStruct, setLtStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [mtStruct, setMtStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [htStruct, setHtStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [rdStruct, setRdStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [crStruct, setCrStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [bdStruct, setBdStruct] = useState(Array(steps * 4).fill("~").join(" "));
    const [dPlay, setDPlay] = useState(true)
    const [dBank, setDBank] = useState("RolandTR909");
    const [dFast, setDFast] = useState(1);
    const [dGain, setDGain] = useState(1);
    
    return (
        <div>
            <canvas id="roll"></canvas>
            <textarea className="form-control" rows="15" id="proc" ></textarea>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={handleProcAndPlay} defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={handleProcAndPlay} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div>
            <div id="output" />
            <div id="editor" />
            <DrumSequencer
                // bass drum
                bdStruct={bdStruct} setBdStruct={setBdStruct}
                // hihat
                hhStruct={hhStruct} setHhStruct={setHhStruct}
                // snare drum
                sdStruct={sdStruct} setSdStruct={setSdStruct}
                // rim shot
                rimStruct={rimStruct} setRimStruct={setRimStruct}
                // open hihat
                ohStruct={ohStruct} setOhStruct={setOhStruct}
                // low tom
                ltStruct={ltStruct} setLtStruct={setLtStruct}
                // middle tom
                mtStruct={mtStruct} setMtStruct={setMtStruct}
                // high tom
                htStruct={htStruct} setHtStruct={setHtStruct}
                // ride cymbal
                rdStruct={rdStruct} setRdStruct={setRdStruct}
                // crash cymbal
                crStruct={crStruct} setCrStruct={setCrStruct}
                // settings
                steps={steps}
                dPlay={dPlay} setDPlay={setDPlay}
                dBank={dBank} setDBank={setDBank}
                dFast={dFast} setDFast={setDFast}
                dGain={dGain} setDGain={setDGain}
            />
            <div className="col-md-4">
                <nav>
                    <button id="process" onClick={handleProc} className="btn btn-outline-primary">Preprocess</button>
                    <button id="process_play" onClick={handleProcAndPlay} className="btn btn-outline-primary">Proc & Play</button>
                    <br />
                    <button id="play" className="btn btn-outline-primary">Play</button>
                    <button id="stop" className="btn btn-outline-primary">Stop</button>
                </nav>
            </div>
        </div>
    );
}

// export default function StrudelDemo() {

// const hasRun = useRef(false);

// useEffect(() => {

//     if (!hasRun.current) {
//         document.addEventListener("d3Data", handleD3Data);
//         console_monkey_patch();
//         hasRun.current = true;
//         //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
//             //init canvas
//             const canvas = document.getElementById('roll');
//             canvas.width = canvas.width * 2;
//             canvas.height = canvas.height * 2;
//             const drawContext = canvas.getContext('2d');
//             const drawTime = [-2, 2]; // time window of drawn haps
//             globalEditor = new StrudelMirror({
//                 defaultOutput: webaudioOutput,
//                 getTime: () => getAudioContext().currentTime,
//                 transpiler,
//                 root: document.getElementById('editor'),
//                 drawTime,
//                 onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
//                 prebake: async () => {
//                     initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
//                     const loadModules = evalScope(
//                         import('@strudel/core'),
//                         import('@strudel/draw'),
//                         import('@strudel/mini'),
//                         import('@strudel/tonal'),
//                         import('@strudel/webaudio'),
//                     );
//                     await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
//                 },
//             });
            
//         document.getElementById('proc').value = stranger_tune
//         SetupButtons()
//         Proc()
//     }

// }, []);

// return (
//     <div>
//         <h2>Strudel Demo</h2>
//         <main>

//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
//                         <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
//                         <textarea className="form-control" rows="15" id="proc" ></textarea>
//                     </div>
//                     <div className="col-md-4">

//                         <nav>
//                             <button id="process" className="btn btn-outline-primary">Preprocess</button>
//                             <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
//                             <br />
//                             <button id="play" className="btn btn-outline-primary">Play</button>
//                             <button id="stop" className="btn btn-outline-primary">Stop</button>
//                         </nav>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
//                         <div id="editor" />
//                         <div id="output" />
//                     </div>
//                     <div className="col-md-4">
//                         <div className="form-check">
//                             <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
//                             <label className="form-check-label" htmlFor="flexRadioDefault1">
//                                 p1: ON
//                             </label>
//                         </div>
//                         <div className="form-check">
//                             <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
//                             <label className="form-check-label" htmlFor="flexRadioDefault2">
//                                 p1: HUSH
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <canvas id="roll"></canvas>
//         </main >
//     </div >
// );
