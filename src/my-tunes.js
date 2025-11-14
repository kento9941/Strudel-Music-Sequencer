import { useGlobalStore } from "./stores/use-global-store";
import { useDrumStore } from "./stores/use-drum-store";
import { usePianoStore } from "./stores/use-piano-store";


export function MyTunes() {
    // global settings
    const globalState = useGlobalStore.getState();
    const BPM = globalState.BPM;

    // drums
    const drumState = useDrumStore.getState();
    const drumStack = drumState.getDrumStr();
    const drumBank = drumState.drums.settings.bank;
    const drumSlow = drumState.drums.settings.slow;
    const drumGain = drumState.drums.settings.gain;

    // piano
    const pianoState = usePianoStore.getState();
    const pianoStack = pianoState.getPianoStr();
    const pianoSlow = pianoState.piano.settings.slow;
    const pianoGain = pianoState.piano.settings.gain;

    return `
    setcps(${BPM}/60/4)

    samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')
    
    function makeNote(n, s, g, r) {
        return note(n).sound(s).postgain(g).release(r);
    }
    stack(
        stack(
            ${drumStack}.bank("${drumBank}").slow(${drumSlow}).gain(${drumGain})
        ),

        stack(
            ${pianoStack}.slow(${pianoSlow}).gain(${pianoGain})
        )
    ).log()
    `;
}