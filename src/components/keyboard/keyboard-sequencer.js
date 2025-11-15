
import { useState } from "react";
import { useStrudelStore } from "../../stores/use-strudel-store";
import { useKeyboardStore } from "../../stores/use-keyboard-store";
import KeyboardBarButtons from "./keyboard-bar-buttons";
import BankSelector from "../bank-selector";
import KeyboardTrack from "./keyboard-tracks";
import GeneralVolumeSlider from "../volume-sliders/general-volume-slider";
import KeyboardNoteSettings from "./keyboard-note-settings";

export default function KeyboardSequencer() {
    const { play, stop, proc } = useStrudelStore();

    const banks = [
        { value: "gm_piano", label: "Acoustic Piano" },
        { value: "gm_epiano1", label: "Keyboard 1" },
        { value: "gm_epiano2", label: "Keyboard 2" },
    ];

    // play button toggle
    const [isPlaying, setIsPlaying] = useState(false);

    // note settings
    const [selectedNote, setSelectedNote] = useState({note: "", index: 0});

    const keyboard = useKeyboardStore.getState().keyboard;

    // keyboard settings
    const bank = useKeyboardStore((state) => state.keyboard.settings.bank);
    const keyboardGain = useKeyboardStore((state) => state.keyboard.settings.gain);

    // setter
    const updateKeyboard = useKeyboardStore((state) => state.updateKeyboard);

    // keyboard tracks
    const { struct: cStruct, play: cPlay, gain: cGain } = useKeyboardStore((state) => state.keyboard.c);
    const { struct: csStruct, play: csPlay, gain: csGain } = useKeyboardStore((state) => state.keyboard.cs);
    const { struct: dStruct, play: dPlay, gain: dGain } = useKeyboardStore((state) => state.keyboard.d);
    const { struct: dsStruct, play: dsPlay, gain: dsGain } = useKeyboardStore((state) => state.keyboard.ds);
    const { struct: eStruct, play: ePlay, gain: eGain } = useKeyboardStore((state) => state.keyboard.e);
    const { struct: fStruct, play: fPlay, gain: fGain } = useKeyboardStore((state) => state.keyboard.f);
    const { struct: fsStruct, play: fsPlay, gain: fsGain } = useKeyboardStore((state) => state.keyboard.fs);
    const { struct: gStruct, play: gPlay, gain: gGain } = useKeyboardStore((state) => state.keyboard.g);
    const { struct: gsStruct, play: gsPlay, gain: gsGain } = useKeyboardStore((state) => state.keyboard.gs);
    const { struct: aStruct, play: aPlay, gain: aGain } = useKeyboardStore((state) => state.keyboard.a);
    const { struct: asStruct, play: asPlay, gain: asGain } = useKeyboardStore((state) => state.keyboard.as);
    const { struct: bStruct, play: bPlay, gain: bGain } = useKeyboardStore((state) => state.keyboard.b);

    return (
        <div className="sequencer">
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "3rem"}}>

                {/* keyboard settings */}
                <div className="instrument-settings">
                    <div className="name">Keyboard Settings</div>

                    {/* play & stop */}
                    <div>
                        {!isPlaying ? 
                            <i
                                className="fa-solid fa-play"
                                onClick={() => {
                                    updateKeyboard("settings", {play: true});
                                    proc?.();
                                    setIsPlaying(true);
                                    play?.();
                                }}
                            />
                            :
                            <i
                                className="fa-solid fa-pause"
                                onClick={() => {
                                    updateKeyboard("settings", {play: false});
                                    setIsPlaying(false);
                                    stop?.();
                                }}
                            />
                        }
                    </div>
                    
                    <div style={{display: "flex", alignItems: "center", gap: "1.5rem"}}>

                        <BankSelector banks={banks} bank={bank} update={updateKeyboard} />

                        {/* volume slider */}
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.3rem"}}>
                            <i className="mute-button fa-solid fa-volume-high" />                               
                            <GeneralVolumeSlider name="settings" gain={keyboardGain} update={updateKeyboard} />
                        </div>

                    </div>
                </div>

                {/* add, delete bar button */}
                <KeyboardBarButtons instrument={keyboard} update={updateKeyboard} />

                {/* note settings */}
                {selectedNote.note !== "" &&
                    <KeyboardNoteSettings selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
                }
            </div>
            
            <div className="mt-4">
                <KeyboardTrack displayName="C" name="c" symbol="c3" struct={cStruct} play={cPlay} gain={cGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="C#/D♭" name="cs" symbol="cs3" struct={csStruct} play={csPlay} gain={csGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="D" name="d" symbol="d3" struct={dStruct} play={dPlay} gain={dGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="D#/E♭" name="ds" symbol="ds3" struct={dsStruct} play={dsPlay} gain={dsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="E" name="e" symbol="e3" struct={eStruct} play={ePlay} gain={eGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="F" name="f" symbol="f3" struct={fStruct} play={fPlay} gain={fGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="F#/G♭" name="fs" symbol="fs3" struct={fsStruct} play={fsPlay} gain={fsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="G" name="g" symbol="g3" struct={gStruct} play={gPlay} gain={gGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="G#/A♭" name="gs" symbol="gs3" struct={gsStruct} play={gsPlay} gain={gsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="A" name="a" symbol="a3" struct={aStruct} play={aPlay} gain={aGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="A#/B♭" name="as" symbol="as3" struct={asStruct} play={asPlay} gain={asGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <KeyboardTrack displayName="B" name="b" symbol="b3" struct={bStruct} play={bPlay} gain={bGain} setSelectedNote={setSelectedNote} />
            </div>
        </div>
    )
}