import { create } from "zustand";

export const useSynthStore = create((set, get) => ({
    synth: {
        settings: {
            play: false,
            bank: "saw",
            slow: 2,
            gain: 1,
        },
        c: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        cs: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        d: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        ds: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        e: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        f: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        fs: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        g: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        gs: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        a: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        as: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        },
        b: {
            struct: Array.from({ length: 32 }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            })),
            play: true,
            gain: 1
        }
    },

    updateSynth: (name, updates) => {
        set((state) => ({
            synth: {
                ...state.synth,
                [name]: { ...state.synth[name], ...updates }
            }
        }))
    },

    updateNote: (track, index, updates) => {
        set((state) => {
            const oldStruct = state.synth[track].struct;
            const newStruct = oldStruct.map((obj, i) =>
            i === index ? { ...obj, ...updates } : obj
            );

            return {
            synth: {
                ...state.synth,
                [track]: {
                    ...state.synth[track],
                    struct: newStruct
                }
            }
            };
        });
    },

    resetTrack: (track) => {
        set((state) => {
            const structLength = state.synth[track].struct.length;
            const resetStruct = Array.from({ length: structLength }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            }));

            return {
                synth: {
                    ...state.synth,
                    [track]: {
                        ...state.synth[track],
                        struct: resetStruct,
                        play: true,
                        gain: 1,
                    },
                },
            };
        });
    },

    getSynthStr: () => {

        /*
        synth = {
            c: {...}, cs: {...}, d: {...}, ...
        }
        */
        const { synth } = get();
        const synthBank = synth.settings.bank;

        // mute
        if (!synth.settings.play) return `seq(["~"])`;

        const stack = Object.entries(synth)    // [["c", {struct: [...], play: true, gain: 1}], ...]
            .filter(([name]) => name !== "settings")
            .map(([name, { struct, play, gain }]) => {

                // mute track
                if (!play) {
                    return `// ${name} muted`;
                };

                let seq = "seq([" +
                    struct.map(obj =>
                        obj.note === "~"
                        ? `"~"`
                        : `makeNote("${obj.note}", "${synthBank}", ${obj.gain * gain}, ${obj.release})`
                    ).join(", ") +
                    "])";

                return seq;
            })
            .join(",\n    ");

        return `stack(
        ${stack})`;
    },
}))