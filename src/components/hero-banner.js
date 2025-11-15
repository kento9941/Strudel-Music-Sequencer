import banner from '../assets/snowy_background.jpg';
import snowVideo from '../assets/snow_particles.mp4';
import AudioVisualizer from './AudioVisualizer';

export default function HeroBanner() {
    return (
        <div
            className="hero-banner"
            style={{
                backgroundImage: `linear-gradient(rgba(18, 14, 11, 0.5), rgba(18, 14, 11, 0.5)), url(${banner})`
            }}
        >
            <video
                className="hero-video"
                src={snowVideo}
                autoPlay
                loop
                muted
                playsInline
            />

            <div className="hero-content">
                <div className='texts'>
                    <div className="logo">
                        <i className="fa-solid fa-bars" />
                        <i className="fa-solid fa-bars fa-rotate-90" />
                        <i className="fa-solid fa-bars" />
                    </div>
                    <div className="logo-text">Strudel Music Sequencer</div>
                </div>
                <div className="graph">
                    {/* <AudioVisualizer /> */}
                </div>
            </div>
        </div>

    )
}