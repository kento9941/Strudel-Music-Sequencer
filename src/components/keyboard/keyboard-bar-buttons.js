import addKeyboardBar from "../../utils/add-keyboard-bar";
import deleteBar from "../../utils/delete-bar";

export default function KeyboardBarButtons({instrument, update}) {
    return (
        <div className="bar-buttons">
            <div className="button" onClick={() => addKeyboardBar({instrument, update})}>
                Add Bar
            </div>
            <div className="button" onClick={() => deleteBar({instrument, update})}>
                Delete Bar
            </div>
        </div>
    )
}