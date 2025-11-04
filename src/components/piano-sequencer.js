
import { useState } from "react";
import { useStrudelStore } from "../stores/use-strudel-store";
import { usePianoStore } from "../stores/use-piano-store";
import BarButtons from "./bar-buttons";
import BankSelector from "./bank-selector";
import Track from "./tracks";
import VolumeSlider from "./volume-slider";

export default function PianoSequencer() {
    const { play, stop, proc } = useStrudelStore();

    const banks = [
        { value: "gm_piano", label: "Acoustic Piano" },
    ];

    const piano = usePianoStore.getState().piano;
    const bank = usePianoStore((state) => state.piano.settings.bank)
    const pianoPlay = usePianoStore((state) => state.piano.settings.play);
    const pianoGain = usePianoStore((state) => state.piano.settings.gain);
    const updatePiano = usePianoStore((state) => state.updatePiano)

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

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="">
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-end"}}>

                {/* piano settings */}
                <div className="instrument-settings">
                    <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "8rem"}}>
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
                                        setIsPlaying(false);
                                        stop?.();
                                    }}
                                />
                            }
                        </div>
                    </div>                    
                    
                    <div style={{display: "flex", alignItems: "center", gap: "0.5rem"}}>
                        <BankSelector banks={banks} bank={bank} update={updatePiano} />

                        {/* mute button */}
                        <div
                            className="mute-button"
                            onClick={() => updatePiano("settings", { play: !play })}
                            style={{marginLeft: "0.75rem", marginRight: "0.5rem"}}
                        >
                            {pianoPlay ? <i className="fa-solid fa-volume-high" /> : <i className="fa-solid fa-volume-xmark" /> }
                        </div>                                
                        <VolumeSlider name="settings" gain={pianoGain} update={updatePiano} />
                    </div>
                </div>
                <BarButtons instrument={piano} update={updatePiano} />
            </div>
            
            <div className="mt-4">
                <Track displayName="C" name="c" symbol="c" struct={cStruct} play={cPlay} gain={cGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="C#/D♭" name="cs" symbol="cs" struct={csStruct} play={csPlay} gain={csGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="D" name="d" symbol="d" struct={dStruct} play={dPlay} gain={dGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="D#/E♭" name="ds" symbol="ds" struct={dsStruct} play={dsPlay} gain={dsGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="E" name="e" symbol="e" struct={eStruct} play={ePlay} gain={eGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="F" name="f" symbol="f" struct={fStruct} play={fPlay} gain={fGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="F#/G♭" name="fs" symbol="fs" struct={fsStruct} play={fsPlay} gain={fsGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="G" name="g" symbol="g" struct={gStruct} play={gPlay} gain={gGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="G#/A♭" name="gs" symbol="gs" struct={gsStruct} play={gsPlay} gain={gsGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="A" name="a" symbol="a" struct={aStruct} play={aPlay} gain={aGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="A#/B♭" name="as" symbol="as" struct={asStruct} play={asPlay} gain={asGain} update={updatePiano} />
            </div>
            <div className="mt-4">
                <Track displayName="B" name="b" symbol="b" struct={bStruct} play={bPlay} gain={bGain} update={updatePiano} />
            </div>
        </div>
    )
}