import { useSynthStore } from "../../stores/use-synth-store";
import OctaveRadio from "../octave-radio";
import ReleaseSelector from "../selectors/release-selector";
import NoteVolumeSlider from "../volume-sliders/note-volume-slider";

export default function SynthNoteSettings({selectedNote, setSelectedNote}) {
    const updateNote = useSynthStore((state) => state.updateNote);

    let n = selectedNote.note;
    let i = selectedNote.index;
    const noteSymbol = useSynthStore((state) => state.synth[n].struct[i].note);
    const noteGain = useSynthStore((state) => state.synth[n].struct[i].gain);
    const noteRelease = useSynthStore((state) => state.synth[n].struct[i].release);

    return (
        <div className="note-settings">

            <i
                className="close fa-solid fa-circle-xmark"
                onClick={() => setSelectedNote({note: "", index: 0})}
            />

            <div className="name">
                Note Settings
            </div>

            <OctaveRadio selectedNote={selectedNote} note={noteSymbol} updateNote={updateNote} />

            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "3rem"}}>
                <span style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.75rem"}}>
                    Duration
                    <ReleaseSelector selectedNote={selectedNote} release={noteRelease} updateNote={updateNote} />
                </span>

                <span style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "0.25rem"}}>
                    <i class="fa-solid fa-volume-high" />
                    <NoteVolumeSlider selectedNote={selectedNote} gain={noteGain} updateNote={updateNote} />
                </span>
            </div>

        </div>
    )
}