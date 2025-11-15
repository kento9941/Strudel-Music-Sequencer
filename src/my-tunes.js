import { useGlobalStore } from "./stores/use-global-store";
import { useDrumStore } from "./stores/use-drum-store";
import { useKeyboardStore } from "./stores/use-keyboard-store";
import { useGuitarStore } from "./stores/use-guitar-store";


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

    // keyboard
    const keyboardState = useKeyboardStore.getState();
    const keyboardStack = keyboardState.getKeyboardStr();
    const keyboardSlow = keyboardState.keyboard.settings.slow;
    const keyboardGain = keyboardState.keyboard.settings.gain;

    // guitar
    const guitarState = useGuitarStore.getState();
    const guitarStack = guitarState.getGuitarStr();
    const guitarSlow = guitarState.guitar.settings.slow;
    const guitarGain = guitarState.guitar.settings.gain;

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
            ${keyboardStack}.slow(${keyboardSlow}).gain(${keyboardGain})
        ),

        stack(
            ${guitarStack}.slow(${guitarSlow}).gain(${guitarGain})
        )
    ).log()
    `;
}