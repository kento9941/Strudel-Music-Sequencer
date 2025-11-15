import './App.css';
import React, { useState } from "react";
import StrudelEditor from './components/strudel/strudel-editor';
import HeroBanner from './components/hero-banner';
import NavBar from './components/nav-bar';
import DrumSequencer from './components/drums/drum-sequencer';
import KeyboardSequencer from './components/keyboard/keyboard-sequencer';
import GuitarSequencer from './components/guitar/guitar-sequencer';

export default function App() { 
  const [instrument, setInstrument] = useState("drums");
  return (
    <div className="App">
      <HeroBanner />

      <NavBar instrument={ instrument } setInstrument={ setInstrument } />

      {instrument === "drums" && (
        <DrumSequencer />
      )}
      {instrument === "keyboard" && (
        <KeyboardSequencer />
      )}
      {instrument === "guitar" && (
        <GuitarSequencer />
      )}
      {instrument === "synths" && (
        <>synths page</>
      )}
      
      <StrudelEditor />
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
//                 onDraw: (haps, time) => drawKeyboardroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
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
