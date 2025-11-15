import addGuitarBar from "../../utils/add-guitar-bar";
import deleteBar from "../../utils/delete-bar";

export default function GuitarBarButtons({instrument, update}) {
    return (
        <div className="bar-buttons">
            <div className="button" onClick={() => addGuitarBar({instrument, update})}>
                Add Bar
            </div>
            <div className="button" onClick={() => deleteBar({instrument, update})}>
                Delete Bar
            </div>
        </div>
    )
}