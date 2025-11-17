
import { useState } from "react";
import { useStrudelStore } from "../../stores/use-strudel-store";
import { useSynthStore } from "../../stores/use-synth-store";
import SynthBarButtons from "./synth-bar-buttons";
import BankSelector from "../bank-selector";
import SynthTrack from "./synth-tracks";
import GeneralVolumeSlider from "../volume-sliders/general-volume-slider";
import SynthNoteSettings from "./synth-note-settings";

export default function SynthSequencer() {
    const { play, stop, proc } = useStrudelStore();

    const banks = [
        { value: "saw", label: "Saw" },
        { value: "square", label: "Square" },
        { value: "triangle", label: "Triangle" },
    ];

    // play button toggle
    const [isPlaying, setIsPlaying] = useState(false);

    // note settings
    const [selectedNote, setSelectedNote] = useState({note: "", index: 0});

    const synth = useSynthStore.getState().synth;

    // synth settings
    const bank = useSynthStore((state) => state.synth.settings.bank);
    const synthGain = useSynthStore((state) => state.synth.settings.gain);

    // setter
    const updateSynth = useSynthStore((state) => state.updateSynth);

    // synth tracks
    const { struct: cStruct, play: cPlay, gain: cGain } = useSynthStore((state) => state.synth.c);
    const { struct: csStruct, play: csPlay, gain: csGain } = useSynthStore((state) => state.synth.cs);
    const { struct: dStruct, play: dPlay, gain: dGain } = useSynthStore((state) => state.synth.d);
    const { struct: dsStruct, play: dsPlay, gain: dsGain } = useSynthStore((state) => state.synth.ds);
    const { struct: eStruct, play: ePlay, gain: eGain } = useSynthStore((state) => state.synth.e);
    const { struct: fStruct, play: fPlay, gain: fGain } = useSynthStore((state) => state.synth.f);
    const { struct: fsStruct, play: fsPlay, gain: fsGain } = useSynthStore((state) => state.synth.fs);
    const { struct: gStruct, play: gPlay, gain: gGain } = useSynthStore((state) => state.synth.g);
    const { struct: gsStruct, play: gsPlay, gain: gsGain } = useSynthStore((state) => state.synth.gs);
    const { struct: aStruct, play: aPlay, gain: aGain } = useSynthStore((state) => state.synth.a);
    const { struct: asStruct, play: asPlay, gain: asGain } = useSynthStore((state) => state.synth.as);
    const { struct: bStruct, play: bPlay, gain: bGain } = useSynthStore((state) => state.synth.b);

    return (
        <div className="sequencer">
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "3rem"}}>

                {/* synth settings */}
                <div className="instrument-settings">
                    <div className="name">Synth Settings</div>

                    {/* play & stop */}
                    <div>
                        {!isPlaying ? 
                            <i
                                className="fa-solid fa-play"
                                onClick={() => {
                                    updateSynth("settings", {play: true});
                                    proc?.();
                                    setIsPlaying(true);
                                    play?.();
                                }}
                            />
                            :
                            <i
                                className="fa-solid fa-pause"
                                onClick={() => {
                                    updateSynth("settings", {play: false});
                                    setIsPlaying(false);
                                    stop?.();
                                }}
                            />
                        }
                    </div>
                    
                    <div style={{display: "flex", alignItems: "center", gap: "1.5rem"}}>

                        <BankSelector banks={banks} bank={bank} update={updateSynth} />

                        {/* volume slider */}
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.3rem"}}>
                            <i className="mute-button fa-solid fa-volume-high" />                               
                            <GeneralVolumeSlider name="settings" gain={synthGain} update={updateSynth} />
                        </div>

                    </div>
                </div>

                {/* add, delete bar button */}
                <SynthBarButtons instrument={synth} update={updateSynth} />

                {/* note settings */}
                {selectedNote.note !== "" &&
                    <SynthNoteSettings selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
                }
            </div>
            
            <div className="mt-4">
                <SynthTrack displayName="C" name="c" symbol="c3" struct={cStruct} play={cPlay} gain={cGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="C#/D♭" name="cs" symbol="cs3" struct={csStruct} play={csPlay} gain={csGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="D" name="d" symbol="d3" struct={dStruct} play={dPlay} gain={dGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="D#/E♭" name="ds" symbol="ds3" struct={dsStruct} play={dsPlay} gain={dsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="E" name="e" symbol="e3" struct={eStruct} play={ePlay} gain={eGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="F" name="f" symbol="f3" struct={fStruct} play={fPlay} gain={fGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="F#/G♭" name="fs" symbol="fs3" struct={fsStruct} play={fsPlay} gain={fsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="G" name="g" symbol="g3" struct={gStruct} play={gPlay} gain={gGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="G#/A♭" name="gs" symbol="gs3" struct={gsStruct} play={gsPlay} gain={gsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="A" name="a" symbol="a3" struct={aStruct} play={aPlay} gain={aGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="A#/B♭" name="as" symbol="as3" struct={asStruct} play={asPlay} gain={asGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <SynthTrack displayName="B" name="b" symbol="b3" struct={bStruct} play={bPlay} gain={bGain} setSelectedNote={setSelectedNote} />
            </div>
        </div>
    )
}