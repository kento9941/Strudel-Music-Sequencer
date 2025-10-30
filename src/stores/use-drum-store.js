import { create } from "zustand";

export const useDrumStore = create((set, get) => ({
    drums: {
        settings: {
            bank: "RolandTR808"
        },
        hihat: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        open_hihat: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        snare_drum: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        rim_shot: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        low_tom: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        middle_tom: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        high_tom: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        ride_cymbal: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        crash_cymbal: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        },
        bass_drum: {
            struct: Array(16).fill("~"),
            play: true,
            gain: 1
        }
    },

    updateDrum: (name, updates) => {
        set((state) => ({
            drums: {
                ...state.drums,
                [name]: { ...state.drums[name], ...updates }
            }
        }))
    },

    getDrumStr: () => {
    const { drums } = get();
    /*
    drums = {
        hh: {...}, oh: {...}, sd: {...}, ...
    }
     */

    const stack = Object.entries(drums)    // [["hh", {struct: [...], play: true, gain: 1}], ...]
        .filter(([name]) => name !== "settings")    // remove "settings"
        .map(([name, { struct, play, gain }]) => {
        // mute
        if (!play) {
            return `// ${name} muted`;
        };
        return `s("${struct.join(" ")}").gain(${gain})`;
    })
    .join(",\n    ");

    return `stack(
    ${stack})`;
    },
}))