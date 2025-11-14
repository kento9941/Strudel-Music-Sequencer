import React, { useEffect, useRef } from "react";
import { StrudelMirror } from "@strudel/codemirror";
import { drawPianoroll } from "@strudel/draw";
import { getAudioContext, webaudioOutput, registerSynthSounds } from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import { transpiler } from '@strudel/transpiler';
import { evalScope } from '@strudel/core';
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { MyTunes } from "../../my-tunes";
import console_monkey_patch, { getD3Data } from "../../console-monkey-patch";
import { useStrudelStore } from "../../stores/use-strudel-store";

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelEditor() {
    const setControls = useStrudelStore((state) => state.setControls);
    const setPlaying = useStrudelStore((state) => state.setPlaying);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            // init canvas
            const canvas = document.getElementById("roll");
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext("2d");
            const drawTime = [-2, 2];

            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById("editor"),
                drawTime,
                onDraw: (haps, time) =>
                drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                initAudioOnFirstClick();
                const loadModules = evalScope(
                    import("@strudel/core"),
                    import("@strudel/draw"),
                    import("@strudel/mini"),
                    import("@strudel/tonal"),
                    import("@strudel/webaudio")
                );
                await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            document.getElementById("proc").value = MyTunes();
        }
    }, []);

    const handlePlay = () => {
        globalEditor?.evaluate()
        setPlaying(true);
    };
    const handleStop = () => {
        globalEditor?.stop()
        setPlaying(false);
    };
    const handleProc = () => {
        const code = MyTunes();
        globalEditor?.setCode(code);
    };

    useEffect(() => {
        setControls({
            play: handlePlay,
            stop: handleStop,
            proc: handleProc,
        });
    }, [setControls])

    return (
        <div>
            <textarea id="proc" rows="10" style={{ width: "100%" }} hidden />
            <canvas id="roll" style={{ border: "1px solid #ccc" }} hidden />
            <div
                id="editor"
                style={{
                textAlign: "left",
                margin: "0 auto",
                width: "85vw",
            }}/>
        </div>
    );
    }
