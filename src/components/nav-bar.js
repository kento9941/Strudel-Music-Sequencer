import GlobalSettings from "./global-settings";

export default function NavBar({ instrument, setInstrument }) {
    return (
        <div className="nav-bar">
            <div className="nav-section">
                
            </div>

            <div className="nav-section">
                <GlobalSettings />
            </div> 

            <div className="nav-section">
                <div className="radio-inputs">
                    <label className="radio">
                        <input
                            type="radio"
                            name="radio"
                            value="drums"
                            checked={instrument === "drums"}
                            onChange={() => setInstrument("drums")}
                        />
                        <span className="name">Drums</span>
                    </label>

                    <label className="radio">
                        <input
                            type="radio"
                            name="radio"
                            value="keyboard"
                            checked={instrument === "keyboard"}
                            onChange={() => setInstrument("keyboard")}
                        />
                        <span className="name">Keyboard</span>
                    </label>
                        
                    <label className="radio">
                        <input
                            type="radio"
                            name="radio"
                            value="guitar"
                            checked={instrument === "guitar"}
                            onChange={() => setInstrument("guitar")}
                        />
                        <span className="name">Guitar</span>
                    </label>

                    <label className="radio">
                        <input
                            type="radio"
                            name="radio"
                            value="synths"
                            checked={instrument === "synths"}
                            onChange={() => setInstrument("synths")}
                        />
                        <span className="name">Synths</span>
                    </label>
                </div>
            </div>
        </div>
    )
}