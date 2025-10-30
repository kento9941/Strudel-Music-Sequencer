import { useDrumStore } from "../../stores/use-drum-store.js";

export default function CrashCymbal() {
    // get drum settings
    const { struct, play, gain } = useDrumStore((state) => state.drums.crash_cymbal);
    const updateDrum = useDrumStore((state) => state.updateDrum);

    const toggleNote = (index) => {
        const newStruct = [...struct];
        newStruct[index] = struct[index] === "cr" ? "~" : "cr";
        updateDrum("crash_cymbal", { struct: newStruct });
    };

    const reset = () => {
        updateDrum("crash_cymbal", { struct: Array(struct.length).fill("~") });
        updateDrum("crash_cymbal", { play: true });
        updateDrum("crash_cymbal", { gain: 1 });
    }

    return (
        <div style={{ display: "flex", gap: "1rem"}}>
            <div className="drum-settings">
                <div className="name">Crash Cymbal</div>

                {/* mute button */}
                <div
                    className="mute-button"
                    onClick={() => updateDrum("crash_cymbal", { play: !play })}
                >
                    {play ? <i className="fa-solid fa-volume-high" /> : <i className="fa-solid fa-volume-xmark" /> }
                </div>

                {/* volume slider */}
                <input
                    className="volume-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={gain}
                    onChange={(e) => updateDrum("crash_cymbal", { gain: parseFloat(e.target.value) })}
                />

                {/* reset button */}
                <i className="fa-solid fa-rotate-left ms-2" onClick={() => reset()} />
                
            </div>
            <div style={{ display: "flex", gap: "0.1rem" }}>
                {struct.map((note, i) => (
                <div
                    key={i}
                    onClick={() => toggleNote(i)}
                    className="drum-bar"
                    style={{
                    backgroundColor: note === "cr" ? "white" : "#171717",
                    transition: "background-color 0.10s",
                    }}
                />
                ))}
            </div>
        </div>
    );
    }
