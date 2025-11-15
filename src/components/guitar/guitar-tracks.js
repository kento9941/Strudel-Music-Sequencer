import { useGuitarStore } from "../../stores/use-guitar-store.js";
import GeneralVolumeSlider from "../volume-sliders/general-volume-slider.js";

export default function GuitarTrack({
    displayName, name, symbol, struct, play, gain, setSelectedNote
}) {
    const updateGuitar = useGuitarStore((state) => state.updateGuitar);
    const updateNote = useGuitarStore((state) => state.updateNote);
    const resetTrack = useGuitarStore((state) => state.resetTrack);

    const toggleNote = (index) => {
        const note = struct[index].note;
        const newNote = note === "~" ? symbol : "~";
        updateNote(name, index, { note: newNote });
    };

    return (
        <div style={{ display: "flex", gap: "1rem"}}>
            <div className="track-settings">
                <div className="name">{displayName}</div>

                {/* mute button */}
                <div
                    className="mute-button"
                    onClick={() => updateGuitar(name, { play: !play })}
                >
                    {play ? <i className="fa-solid fa-volume-high" /> : <i className="fa-solid fa-volume-xmark" /> }
                </div>

                {/* volume slider */}
                <GeneralVolumeSlider name={name} gain={gain} update={updateGuitar} />

                {/* reset button */}
                <i
                    className="fa-solid fa-rotate-left ms-2"
                    onClick={() => {
                        if (window.confirm("Do you want to reset this track settings? This action cannot be undone."))
                        {
                            resetTrack(name);
                        }}}
                />
                
            </div>
            <div className="notes">
                {struct.map((cell, i) => (
                <div
                    key={i}
                    onClick={() => toggleNote(i)}
                    className="note"
                    style={{
                        backgroundColor: cell.note !== "~" ? "white" : "#171717",
                        transition: "background-color 0.10s",
                        marginRight: ((i + 1) % 16 === 0) ? "1.5rem" : "0",
                        flexShrink: 0
                    }}
                >
                    {cell.note !== "~" && (
                        <i
                            key={i}
                            className="fa-solid fa-grip-lines"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedNote({note: name, index: i})
                            }}
                        />
                    )}
                </div>
                ))}
            </div>
        </div>
    );
    }
