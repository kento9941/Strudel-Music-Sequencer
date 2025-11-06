
import { useState } from "react";
import { useStrudelStore } from "../../stores/use-strudel-store";
import { usePianoStore } from "../../stores/use-piano-store";
import BarButtons from "../bar-buttons";
import BankSelector from "../bank-selector";
import PianoTrack from "./piano-tracks";
import GeneralVolumeSlider from "../volume-sliders/general-volume-slider";
import PianoNoteSettings from "./piano-note-settings";

export default function PianoSequencer() {
    const { play, stop, proc } = useStrudelStore();

    const banks = [
        { value: "gm_piano", label: "Acoustic Piano" },
        { value: "gm_epiano1", label: "Electric Piano 1" },
        { value: "gm_epiano2", label: "Electric Piano 2" },
    ];

    // play button toggle
    const [isPlaying, setIsPlaying] = useState(false);

    // note settings
    const [selectedNote, setSelectedNote] = useState({note: "", index: 0});

    const piano = usePianoStore.getState().piano;

    // piano settings
    const bank = usePianoStore((state) => state.piano.settings.bank);
    const pianoGain = usePianoStore((state) => state.piano.settings.gain);

    // setter
    const updatePiano = usePianoStore((state) => state.updatePiano);

    // piano tracks
    const { struct: cStruct, play: cPlay, gain: cGain } = usePianoStore((state) => state.piano.c);
    const { struct: csStruct, play: csPlay, gain: csGain } = usePianoStore((state) => state.piano.cs);
    const { struct: dStruct, play: dPlay, gain: dGain } = usePianoStore((state) => state.piano.d);
    const { struct: dsStruct, play: dsPlay, gain: dsGain } = usePianoStore((state) => state.piano.ds);
    const { struct: eStruct, play: ePlay, gain: eGain } = usePianoStore((state) => state.piano.e);
    const { struct: fStruct, play: fPlay, gain: fGain } = usePianoStore((state) => state.piano.f);
    const { struct: fsStruct, play: fsPlay, gain: fsGain } = usePianoStore((state) => state.piano.fs);
    const { struct: gStruct, play: gPlay, gain: gGain } = usePianoStore((state) => state.piano.g);
    const { struct: gsStruct, play: gsPlay, gain: gsGain } = usePianoStore((state) => state.piano.gs);
    const { struct: aStruct, play: aPlay, gain: aGain } = usePianoStore((state) => state.piano.a);
    const { struct: asStruct, play: asPlay, gain: asGain } = usePianoStore((state) => state.piano.as);
    const { struct: bStruct, play: bPlay, gain: bGain } = usePianoStore((state) => state.piano.b);

    return (
        <div className="sequencer">
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "3rem"}}>

                {/* piano settings */}
                <div className="instrument-settings">
                    <div className="name">Piano Settings</div>

                    {/* play & stop */}
                    <div>
                        {!isPlaying ? 
                            <i
                                className="fa-solid fa-play"
                                onClick={() => {
                                    updatePiano("settings", {play: true});
                                    proc?.();
                                    setIsPlaying(true);
                                    play?.();
                                }}
                            />
                            :
                            <i
                                className="fa-solid fa-pause"
                                onClick={() => {
                                    updatePiano("settings", {play: false});
                                    setIsPlaying(false);
                                    stop?.();
                                }}
                            />
                        }
                    </div>
                    
                    <div style={{display: "flex", alignItems: "center", gap: "1.5rem"}}>

                        <BankSelector banks={banks} bank={bank} update={updatePiano} />

                        {/* volume slider */}
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.3rem"}}>
                            <i className="mute-button fa-solid fa-volume-high" />                               
                            <GeneralVolumeSlider name="settings" gain={pianoGain} update={updatePiano} />
                        </div>

                    </div>
                </div>

                {/* add, delete bar button */}
                <BarButtons instrument={piano} update={updatePiano} />

                {/* note settings */}
                {selectedNote.note !== "" &&
                    <PianoNoteSettings selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
                }
            </div>
            
            <div className="mt-4">
                <PianoTrack displayName="C" name="c" symbol="c3" struct={cStruct} play={cPlay} gain={cGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="C#/D♭" name="cs" symbol="cs3" struct={csStruct} play={csPlay} gain={csGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="D" name="d" symbol="d3" struct={dStruct} play={dPlay} gain={dGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="D#/E♭" name="ds" symbol="ds3" struct={dsStruct} play={dsPlay} gain={dsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="E" name="e" symbol="e3" struct={eStruct} play={ePlay} gain={eGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="F" name="f" symbol="f3" struct={fStruct} play={fPlay} gain={fGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="F#/G♭" name="fs" symbol="fs3" struct={fsStruct} play={fsPlay} gain={fsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="G" name="g" symbol="g3" struct={gStruct} play={gPlay} gain={gGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="G#/A♭" name="gs" symbol="gs3" struct={gsStruct} play={gsPlay} gain={gsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="A" name="a" symbol="a3" struct={aStruct} play={aPlay} gain={aGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="A#/B♭" name="as" symbol="as3" struct={asStruct} play={asPlay} gain={asGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <PianoTrack displayName="B" name="b" symbol="b3" struct={bStruct} play={bPlay} gain={bGain} setSelectedNote={setSelectedNote} />
            </div>
        </div>
    )
}