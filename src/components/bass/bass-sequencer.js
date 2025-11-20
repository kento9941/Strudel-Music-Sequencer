
import { useState } from "react";
import { useStrudelStore } from "../../stores/use-strudel-store";
import { useBassStore } from "../../stores/use-bass-store";
import BankSelector from "../selectors/bank-selector";
import addBar from "../../utils/bar-handler/add-bar";
import deleteBar from "../../utils/bar-handler/delete-bar";
import BassTrack from "./bass-tracks";
import GeneralVolumeSlider from "../volume-sliders/general-volume-slider";
import BassNoteSettings from "./bass-note-settings";

export default function BassSequencer() {
    const { play, stop, proc } = useStrudelStore();

    const banks = [
        { value: "gm_acoustic_bass", label: "Acoustic Bass" },
        { value: "gm_bassoon", label: "Bassoon" },
        { value: "gm_electric_bass_pick", label: "Pick E-Bass" },
        { value: "gm_fretless_bass", label: "Fretless Bass" },
        { value: "gm_lead_8_bass_lead", label: "Bass Lead" },
        { value: "gm_slap_bass_1", label: "Slap Bass" },
        { value: "gm_synth_bass_1", label: "Synth Bass" },
    ];

    // play button toggle
    const [isPlaying, setIsPlaying] = useState(false);

    // note settings
    const [selectedNote, setSelectedNote] = useState({note: "", index: 0});

    const instrument = useBassStore.getState().bass;

    // bass settings
    const bank = useBassStore((state) => state.bass.settings.bank);
    const bassGain = useBassStore((state) => state.bass.settings.gain);

    // setter
    const update = useBassStore((state) => state.updateBass);

    // bass tracks
    const { struct: cStruct, play: cPlay, gain: cGain } = useBassStore((state) => state.bass.c);
    const { struct: csStruct, play: csPlay, gain: csGain } = useBassStore((state) => state.bass.cs);
    const { struct: dStruct, play: dPlay, gain: dGain } = useBassStore((state) => state.bass.d);
    const { struct: dsStruct, play: dsPlay, gain: dsGain } = useBassStore((state) => state.bass.ds);
    const { struct: eStruct, play: ePlay, gain: eGain } = useBassStore((state) => state.bass.e);
    const { struct: fStruct, play: fPlay, gain: fGain } = useBassStore((state) => state.bass.f);
    const { struct: fsStruct, play: fsPlay, gain: fsGain } = useBassStore((state) => state.bass.fs);
    const { struct: gStruct, play: gPlay, gain: gGain } = useBassStore((state) => state.bass.g);
    const { struct: gsStruct, play: gsPlay, gain: gsGain } = useBassStore((state) => state.bass.gs);
    const { struct: aStruct, play: aPlay, gain: aGain } = useBassStore((state) => state.bass.a);
    const { struct: asStruct, play: asPlay, gain: asGain } = useBassStore((state) => state.bass.as);
    const { struct: bStruct, play: bPlay, gain: bGain } = useBassStore((state) => state.bass.b);

    return (
        <div className="sequencer">
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "3rem"}}>

                {/* bass settings */}
                <div className="instrument-settings">
                    <div className="name">Bass Settings</div>

                    {/* play & stop */}
                    <div>
                        {!isPlaying ? 
                            <i
                                className="fa-solid fa-play"
                                onClick={() => {
                                    update("settings", {play: true});
                                    proc?.();
                                    setIsPlaying(true);
                                    play?.();
                                }}
                            />
                            :
                            <i
                                className="fa-solid fa-pause"
                                onClick={() => {
                                    update("settings", {play: false});
                                    setIsPlaying(false);
                                    stop?.();
                                }}
                            />
                        }
                    </div>
                    
                    <div style={{display: "flex", alignItems: "center", gap: "1.5rem"}}>

                        <BankSelector banks={banks} bank={bank} update={update} />

                        {/* volume slider */}
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.3rem"}}>
                            <i className="mute-button fa-solid fa-volume-high" />                               
                            <GeneralVolumeSlider name="settings" gain={bassGain} update={update} />
                        </div>

                    </div>
                </div>

                {/* add, delete bar button */}
                <div className="bar-buttons">
                    <div className="button" onClick={() => addBar({instrument, update})}>
                        Add Bar
                    </div>
                    <div className="button" onClick={() => deleteBar({instrument, update})}>
                        Delete Bar
                    </div>
                </div>

                {/* note settings */}
                {selectedNote.note !== "" &&
                    <BassNoteSettings selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
                }
            </div>
            
            <div className="mt-4">
                <BassTrack displayName="C" name="c" symbol="c3" struct={cStruct} play={cPlay} gain={cGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="C#/D♭" name="cs" symbol="cs3" struct={csStruct} play={csPlay} gain={csGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="D" name="d" symbol="d3" struct={dStruct} play={dPlay} gain={dGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="D#/E♭" name="ds" symbol="ds3" struct={dsStruct} play={dsPlay} gain={dsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="E" name="e" symbol="e3" struct={eStruct} play={ePlay} gain={eGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="F" name="f" symbol="f3" struct={fStruct} play={fPlay} gain={fGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="F#/G♭" name="fs" symbol="fs3" struct={fsStruct} play={fsPlay} gain={fsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="G" name="g" symbol="g3" struct={gStruct} play={gPlay} gain={gGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="G#/A♭" name="gs" symbol="gs3" struct={gsStruct} play={gsPlay} gain={gsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="A" name="a" symbol="a3" struct={aStruct} play={aPlay} gain={aGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="A#/B♭" name="as" symbol="as3" struct={asStruct} play={asPlay} gain={asGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <BassTrack displayName="B" name="b" symbol="b3" struct={bStruct} play={bPlay} gain={bGain} setSelectedNote={setSelectedNote} />
            </div>
        </div>
    )
}