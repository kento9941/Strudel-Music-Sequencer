import banner from '../assets/snowy_background.jpg';

export default function HeroBanner() {
    return (
        <div
            className="hero-banner"
            style={{
                backgroundImage: `linear-gradient(rgba(18, 14, 11, 0.75), rgba(18, 14, 11, 0.75)), url(${banner})`
            }}
        >
            <div className="row">
                <div className='col-3 texts'>
                    <div className="logo">
                        <i class="fa-solid fa-bars" />
                        <i class="fa-solid fa-bars fa-rotate-90" />
                        <i class="fa-solid fa-bars" />
                    </div>
                    <div className="logo-text">Strudel Music Sequencer</div>
                </div>
                <div className="col-9">

                </div>
            </div>
        </div>

    )
}