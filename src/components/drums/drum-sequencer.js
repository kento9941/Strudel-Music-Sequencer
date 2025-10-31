
import { useState } from "react";
import { useStrudelStore } from "../../stores/use-strudel-store";
import { useDrumStore } from "../../stores/use-drum-store";
import BankSelector from "./bank-selector";
import Hihat from "./hihat";
import OpenHihat from "./open-hihat";
import SnareDrum from "./snare-drum";
import RimShot from "./rim-shot";
import LowTom from "./low-tom";
import MiddleTom from "./middle-tom";
import HighTom from "./high-tom";
import BassDrum from "./bass-drum";
import RideCymbal from "./ride-cymbal";
import CrashCymbal from "./crash-cymbal";

export default function DrumSequencer() {
    const { play, stop, proc } = useStrudelStore();
    const playDrums = useDrumStore((state) => state.drums.settings.play)
    const updateDrum = useDrumStore((state) => state.updateDrum)

    const [isProced, setIsProced] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="">
            <div className="instrument-settings">
                <div className="name">Drums</div>
                <div className="row" style={{gap: "1rem"}}>
                    <div className="col">
                        <BankSelector />
                    </div>

                    {/* preprocess */}
                    <div className="col">
                        <i
                            class="fa-solid fa-rotate-right"
                            onClick={(() => {
                                updateDrum("settings", {play: true});
                                proc?.();
                                setIsProced(true);
                            })}
                        />
                    </div>

                    {/* play & stop */}
                    <div className="col">
                        {!isPlaying ? 
                            <i
                                className="fa-solid fa-play"
                                onClick={() => {
                                    if (!isProced) {
                                        alert("Error: Code has not been preprocessed.");
                                        return;
                                    }
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

                    {/* mute & unmute */}
                    <div className="col">
                        {!playDrums ?
                            <i
                                class="fa-solid fa-volume-xmark"
                                onClick={(() => {
                                    updateDrum("settings", {play: true});
                                    proc?.();
                                })}
                            />
                            :
                            <i
                                class="fa-solid fa-volume-high"
                                onClick={(() => {
                                    updateDrum("settings", {play: false});
                                    proc?.();
                                })}
                            />
                        }
                        
                    </div>
                </div>
            </div>
            
            
            <div className="mt-4">
                <Hihat />
            </div>
            <div className="mt-4">
                <OpenHihat />
            </div>
            <div className="mt-4">
                <SnareDrum />
            </div>
            <div className="mt-4">
                <RimShot />
            </div>
            <div className="mt-4">
                <LowTom />
            </div>
            <div className="mt-4">
                <MiddleTom />
            </div>
            <div className="mt-4">
                <HighTom />
            </div>
            <div className="mt-4">
                <RideCymbal />
            </div>
            <div className="mt-4">
                <CrashCymbal />
            </div>
            <div className="mt-4">
                <BassDrum />
            </div>
        </div>
    )
}