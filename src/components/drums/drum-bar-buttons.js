import addDrumBar from "../../utils/add-drum-bar";
import deleteBar from "../../utils/delete-bar";

export default function DrumBarButtons({instrument, update}) {
    return (
        <div className="bar-buttons">
            <div className="button" onClick={() => addDrumBar({instrument, update})}>
                Add Bar
            </div>
            <div className="button" onClick={() => deleteBar({instrument, update})}>
                Delete Bar
            </div>
        </div>
    )
}