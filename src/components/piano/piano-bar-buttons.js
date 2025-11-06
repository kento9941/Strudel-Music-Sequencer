import addPianoBar from "../../utils/add-piano-bar";
import deleteBar from "../../utils/delete-bar";

export default function PianoBarButtons({instrument, update}) {
    return (
        <div className="bar-buttons">
            <div className="button" onClick={() => addPianoBar({instrument, update})}>
                Add Bar
            </div>
            <div className="button" onClick={() => deleteBar({instrument, update})}>
                Delete Bar
            </div>
        </div>
    )
}