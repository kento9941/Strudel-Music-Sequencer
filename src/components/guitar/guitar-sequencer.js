
import { useState } from "react";
import { useStrudelStore } from "../../stores/use-strudel-store";
import { useGuitarStore } from "../../stores/use-guitar-store";
import BankSelector from "../bank-selector";
import addBar from "../../utils/bar-handler/add-bar";
import deleteBar from "../../utils/bar-handler/delete-bar";
import GuitarTrack from "./guitar-tracks";
import GeneralVolumeSlider from "../volume-sliders/general-volume-slider";
import GuitarNoteSettings from "./guitar-note-settings";

export default function GuitarSequencer() {
    const { play, stop, proc } = useStrudelStore();

    const banks = [
        { value: "gm_acoustic_guitar_nylon", label: "Acoustic Nylon" },
        { value: "gm_acoustic_guitar_steel", label: "Acoustic Steel" },
        { value: "gm_distortion_guitar", label: "Distortion" },
        { value: "gm_electric_guitar_clean", label: "Clean Electric" },
        { value: "gm_electric_guitar_jazz", label: "Jazz Electric" },
        { value: "gm_electric_guitar_muted", label: "Muted Electric" },
        { value: "gm_overdriven_guitar", label: "Overdriven" },
    ];

    // play button toggle
    const [isPlaying, setIsPlaying] = useState(false);

    // note settings
    const [selectedNote, setSelectedNote] = useState({note: "", index: 0});

    const instrument = useGuitarStore.getState().guitar;

    // guitar settings
    const bank = useGuitarStore((state) => state.guitar.settings.bank);
    const guitarGain = useGuitarStore((state) => state.guitar.settings.gain);

    // setter
    const update = useGuitarStore((state) => state.updateGuitar);

    // guitar tracks
    const { struct: cStruct, play: cPlay, gain: cGain } = useGuitarStore((state) => state.guitar.c);
    const { struct: csStruct, play: csPlay, gain: csGain } = useGuitarStore((state) => state.guitar.cs);
    const { struct: dStruct, play: dPlay, gain: dGain } = useGuitarStore((state) => state.guitar.d);
    const { struct: dsStruct, play: dsPlay, gain: dsGain } = useGuitarStore((state) => state.guitar.ds);
    const { struct: eStruct, play: ePlay, gain: eGain } = useGuitarStore((state) => state.guitar.e);
    const { struct: fStruct, play: fPlay, gain: fGain } = useGuitarStore((state) => state.guitar.f);
    const { struct: fsStruct, play: fsPlay, gain: fsGain } = useGuitarStore((state) => state.guitar.fs);
    const { struct: gStruct, play: gPlay, gain: gGain } = useGuitarStore((state) => state.guitar.g);
    const { struct: gsStruct, play: gsPlay, gain: gsGain } = useGuitarStore((state) => state.guitar.gs);
    const { struct: aStruct, play: aPlay, gain: aGain } = useGuitarStore((state) => state.guitar.a);
    const { struct: asStruct, play: asPlay, gain: asGain } = useGuitarStore((state) => state.guitar.as);
    const { struct: bStruct, play: bPlay, gain: bGain } = useGuitarStore((state) => state.guitar.b);

    return (
        <div className="sequencer">
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: "3rem"}}>

                {/* guitar settings */}
                <div className="instrument-settings">
                    <div className="name">Guitar Settings</div>

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
                            <GeneralVolumeSlider name="settings" gain={guitarGain} update={update} />
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
                    <GuitarNoteSettings selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
                }
            </div>
            
            <div className="mt-4">
                <GuitarTrack displayName="C" name="c" symbol="c3" struct={cStruct} play={cPlay} gain={cGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="C#/D♭" name="cs" symbol="cs3" struct={csStruct} play={csPlay} gain={csGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="D" name="d" symbol="d3" struct={dStruct} play={dPlay} gain={dGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="D#/E♭" name="ds" symbol="ds3" struct={dsStruct} play={dsPlay} gain={dsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="E" name="e" symbol="e3" struct={eStruct} play={ePlay} gain={eGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="F" name="f" symbol="f3" struct={fStruct} play={fPlay} gain={fGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="F#/G♭" name="fs" symbol="fs3" struct={fsStruct} play={fsPlay} gain={fsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="G" name="g" symbol="g3" struct={gStruct} play={gPlay} gain={gGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="G#/A♭" name="gs" symbol="gs3" struct={gsStruct} play={gsPlay} gain={gsGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="A" name="a" symbol="a3" struct={aStruct} play={aPlay} gain={aGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="A#/B♭" name="as" symbol="as3" struct={asStruct} play={asPlay} gain={asGain} setSelectedNote={setSelectedNote} />
            </div>
            <div className="mt-4">
                <GuitarTrack displayName="B" name="b" symbol="b3" struct={bStruct} play={bPlay} gain={bGain} setSelectedNote={setSelectedNote} />
            </div>
        </div>
    )
}