import { useState } from "react";
import { useStrudelStore } from "../stores/use-strudel-store";
import { useGlobalStore } from "../stores/use-global-store";
import { useDrumStore } from "../stores/use-drum-store";
import { useKeyboardStore } from "../stores/use-keyboard-store";
import { useGuitarStore } from "../stores/use-guitar-store";
import BPMSelector from "./selectors/bpm-selector";

export default function GlobalSettings() {
    const { play, stop, proc } = useStrudelStore();

    const BPM = useGlobalStore((state) => state.BPM);
    const setBPM = useGlobalStore((state) => state.setBPM);

    const updateDrum = useDrumStore((state) => state.updateDrum);
    const updateKeyboard = useKeyboardStore((state) => state.updateKeyboard);
    const updateGuitar = useGuitarStore((state) => state.updateGuitar)

    const [isPlaying, setIsPlaying] = useState(false);

    function playAll() {
        updateDrum("settings", {play: true});
        updateKeyboard("settings", {play: true});
        updateGuitar("settings", {play: true});
        // add keyboard, guitar, synths update here
        proc?.();
        setIsPlaying(true);
        play?.();
    }

    function stopAll() {
        updateDrum("settings", {play: false});
        updateKeyboard("settings", {play: false});
        updateGuitar("settings", {play: false});

        setIsPlaying(false);
        stop?.();
    }

    return (
        <div className="global-settings">
            {/* BPM */}
            <span style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem", color: "white"}}>
                BPM
                <BPMSelector name="BPM" value={BPM} setValue={setBPM} />
            </span>

            {/* play & stop */}
            <div style={{width: "8rem", cursor: "pointer", color: "white"}}>
                {!isPlaying ?
                    <span
                        style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem"}}
                        onClick={() => {playAll()}}
                    >
                        Play All
                        <i className="fa-solid fa-play"/>
                    </span>
                    :
                    <span
                        style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem"}}
                        onClick={() => {stopAll()}}
                    >
                        Stop All
                        <i
                            className="fa-solid fa-pause"
                        />
                    </span>
                }
            </div>

        </div>
    )
}