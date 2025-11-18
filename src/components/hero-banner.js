import banner from '../assets/snowy_background.jpg';
import snowVideo from '../assets/snow_particles.mp4';
import logo from '../assets/strudel_music_sequencer_logo.png';
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
                    <img src={logo} className="logo" />
                    <div className="logo-text">Strudel Music Sequencer</div>
                </div>
                <div className="graph">
                    <AudioVisualizer />
                </div>
            </div>
        </div>

    )
}