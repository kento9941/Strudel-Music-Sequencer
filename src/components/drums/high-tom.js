import { useDrumStore } from "../../stores/use-drum-store.js";

export default function HighTom() {
    // get drum settings
    const { struct, play, gain } = useDrumStore((state) => state.drums.high_tom);
    const updateDrum = useDrumStore((state) => state.updateDrum);

    const toggleNote = (index) => {
        const newStruct = [...struct];
        newStruct[index] = struct[index] === "ht" ? "~" : "ht";
        updateDrum("high_tom", { struct: newStruct });
    };

    const reset = () => {
        updateDrum("high_tom", { struct: Array(struct.length).fill("~") });
        updateDrum("high_tom", { play: true });
        updateDrum("high_tom", { gain: 1 });
    }

    return (
        <div style={{ display: "flex", gap: "1rem"}}>
            <div className="drum-settings">
                <div className="name">High Tom</div>

                {/* mute button */}
                <div
                    className="mute-button"
                    onClick={() => updateDrum("high_tom", { play: !play })}
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
                    onChange={(e) => updateDrum("high_tom", { gain: parseFloat(e.target.value) })}
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
                    backgroundColor: note === "ht" ? "white" : "#171717",
                    transition: "background-color 0.10s",
                    }}
                />
                ))}
            </div>
        </div>
    );
    }
