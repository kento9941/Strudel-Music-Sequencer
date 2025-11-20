export default function OctaveRadio({selectedNote, note, updateNote}) {

    // e.g. cs3 -> c#3
    let temp = selectedNote.note.replace("s", "#");
    let displayNote = temp.charAt(0).toUpperCase() + temp.slice(1);

    const handleChange = (e) => {
        const newNoteValue = e.target.value;
        updateNote(selectedNote.note, selectedNote.index, { note: newNoteValue });
    };

    return (
        <div className="radio-container">
            {[1, 2, 3, 4, 5, 6].map((octave) => (
                <div className="radio-wrapper" key={octave}>
                    <label className="radio-button">
                        <input
                            type="radio"
                            name={`radio-group-${selectedNote.index}`}
                            value={`${selectedNote.note}${octave}`}
                            checked={note === `${selectedNote.note}${octave}`}
                            onChange={(e) => {
                                e.stopPropagation();
                                handleChange(e);
                            }}
                        />
                        <span className="radio-checkmark"></span>
                        <span className="radio-label">{`${displayNote}${octave}`}</span>
                    </label>
                </div>
            ))}
        </div>
    )
}