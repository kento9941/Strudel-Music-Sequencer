export default function NavBar() {
    return (
        <div className="row nav-bar">
            <div className="col-4">

            </div>
            <div className="col-4 radio-inputs">
                <label className="radio">
                    <input type="radio" name="radio" />
                    <span className="name">Drums</span>
                </label>

                <label className="radio">
                    <input type="radio" name="radio" />
                    <span className="name">Piano</span>
                </label>
                    
                <label className="radio">
                    <input type="radio" name="radio" />
                    <span className="name">Guitar</span>
                </label>

                <label className="radio">
                    <input type="radio" name="radio" />
                    <span className="name">Synthesizer</span>
                </label>
            </div>
        </div>
    )
}