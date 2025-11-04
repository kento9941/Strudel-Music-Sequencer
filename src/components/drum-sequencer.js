
import { useState } from "react";
import { useStrudelStore } from "../stores/use-strudel-store";
import { useDrumStore } from "../stores/use-drum-store";
import BarButtons from "./bar-buttons";
import BankSelector from "./bank-selector";
import Track from "./tracks";
import VolumeSlider from "./volume-slider";

export default function DrumSequencer() {
    const { play, stop, proc } = useStrudelStore();

    const banks = [
        { value: "AkaiMPC60", label: "Akai MPC-60" },
        { value: "AlesisSR16", label: "Alesis SR-16" },
        { value: "EmuSP12", label: "Emu SP-12" },
        { value: "LinnDrum", label: "Linn Drum" },
        { value: "LinnLM1", label: "Linn LM-1" },
        { value: "OberheimDMX", label: "Oberheim DMX" },
        { value: "RolandTR606", label: "Roland TR-606" },
        { value: "RolandTR707", label: "Roland TR-707" },
        { value: "RolandTR808", label: "Roland TR-808" },
        { value: "RolandTR909", label: "Roland TR-909" },
    ];


    const drums = useDrumStore.getState().drums;
    const bank = useDrumStore((state) => state.drums.settings.bank)
    const drumPlay = useDrumStore((state) => state.drums.settings.play);
    const drumGain = useDrumStore((state) => state.drums.settings.gain);
    const updateDrum = useDrumStore((state) => state.updateDrum)

    // drum tracks
    const { struct: hhStruct, play: hhPlay, gain: hhGain } = useDrumStore((state) => state.drums.hihat);
    const { struct: ohStruct, play: ohPlay, gain: ohGain } = useDrumStore((state) => state.drums.open_hihat);
    const { struct: sdStruct, play: sdPlay, gain: sdGain } = useDrumStore((state) => state.drums.snare_drum);
    const { struct: rimStruct, play: rimPlay, gain: rimGain } = useDrumStore((state) => state.drums.rim_shot);
    const { struct: ltStruct, play: ltPlay, gain: ltGain } = useDrumStore((state) => state.drums.low_tom);
    const { struct: mtStruct, play: mtPlay, gain: mtGain } = useDrumStore((state) => state.drums.middle_tom);
    const { struct: htStruct, play: htPlay, gain: htGain } = useDrumStore((state) => state.drums.high_tom);
    const { struct: rdStruct, play: rdPlay, gain: rdGain } = useDrumStore((state) => state.drums.ride_cymbal);
    const { struct: crStruct, play: crPlay, gain: crGain } = useDrumStore((state) => state.drums.crash_cymbal);
    const { struct: bdStruct, play: bdPlay, gain: bdGain } = useDrumStore((state) => state.drums.bass_drum);

    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="">
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-end"}}>

                {/* drum settings */}
                <div className="instrument-settings">
                    <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "8rem"}}>
                        <div className="name">Drums Settings</div>

                        {/* play & stop */}
                        <div>
                            {!isPlaying ? 
                                <i
                                    className="fa-solid fa-play"
                                    onClick={() => {
                                        updateDrum("settings", {play: true});
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
                        <BankSelector banks={banks} bank={bank} update={updateDrum} />

                        {/* mute button */}
                        <div
                            className="mute-button"
                            onClick={() => updateDrum("settings", { play: !play })}
                            style={{marginLeft: "0.75rem", marginRight: "0.5rem"}}
                        >
                            {drumPlay ? <i className="fa-solid fa-volume-high" /> : <i className="fa-solid fa-volume-xmark" /> }
                        </div>                                
                        <VolumeSlider name="settings" gain={drumGain} update={updateDrum} />
                    </div>
                </div>
                <BarButtons instrument={drums} update={updateDrum} />
            </div>
            
            <div className="mt-4">
                <Track displayName="Hi-Hat" name="hihat" symbol="hh" struct={hhStruct} play={hhPlay} gain={hhGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Open Hi-Hat" name="open_hihat" symbol="oh" struct={ohStruct} play={ohPlay} gain={ohGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Snare Drum" name="snare_drum" symbol="sd" struct={sdStruct} play={sdPlay} gain={sdGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Rim Shot" name="rim_shot" symbol="rim" struct={rimStruct} play={rimPlay} gain={rimGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Low Tom" name="low_tom" symbol="lt" struct={ltStruct} play={ltPlay} gain={ltGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Middle Tom" name="middle_tom" symbol="mt" struct={mtStruct} play={mtPlay} gain={mtGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="High Tom" name="high_tom" symbol="ht" struct={htStruct} play={htPlay} gain={htGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Ride Cymbal" name="ride_cymbal" symbol="rd" struct={rdStruct} play={rdPlay} gain={rdGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Crash Cymbal" name="crash_cymbal" symbol="cr" struct={crStruct} play={crPlay} gain={crGain} update={updateDrum} />
            </div>
            <div className="mt-4">
                <Track displayName="Bass Drum" name="bass_drum" symbol="bd" struct={bdStruct} play={bdPlay} gain={bdGain} update={updateDrum} />
            </div>
        </div>
    )
}