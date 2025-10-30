import { useDrumStore } from "../../stores/use-drum-store.js";

export default function Hihat() {
    // get drum settings
    const { struct, play, gain } = useDrumStore((state) => state.drums.middle_tom);
    const updateDrum = useDrumStore((state) => state.updateDrum);

    const toggleNote = (index) => {
        const newStruct = [...struct];
        newStruct[index] = struct[index] === "mt" ? "~" : "mt";
        updateDrum("middle_tom", { struct: newStruct });
    };

    return (
        <div style={{ display: "flex", gap: "1rem"}}>
            <div className="drum-settings">
                <div className="name">Middle Tom</div>

                {/* mute button */}
                <div
                    className="mute-button"
                    onClick={() => updateDrum("middle_tom", { play: !play })}
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
                    onChange={(e) => updateDrum("middle_tom", { gain: parseFloat(e.target.value) })}
                />
                
            </div>
            <div style={{ display: "flex", gap: "0.1rem" }}>
                {struct.map((note, i) => (
                <div
                    key={i}
                    onClick={() => toggleNote(i)}
                    className="drum-bar"
                    style={{
                    backgroundColor: note === "mt" ? "white" : "#171717",
                    transition: "background-color 0.10s",
                    }}
                />
                ))}
            </div>
        </div>
    );
    }
