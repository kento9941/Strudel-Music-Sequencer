import { create } from "zustand";

export const useGuitarStore = create((set, get) => ({
    guitar: {
        settings: {
            play: false,
            bank: "gm_acoustic_guitar_nylon",
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

    updateGuitar: (name, updates) => {
        set((state) => ({
            guitar: {
                ...state.guitar,
                [name]: { ...state.guitar[name], ...updates }
            }
        }))
    },

    updateNote: (track, index, updates) => {
        set((state) => {
            const oldStruct = state.guitar[track].struct;
            const newStruct = oldStruct.map((obj, i) =>
            i === index ? { ...obj, ...updates } : obj
            );

            return {
            guitar: {
                ...state.guitar,
                [track]: {
                    ...state.guitar[track],
                    struct: newStruct
                }
            }
            };
        });
    },

    resetTrack: (track) => {
        set((state) => {
            const structLength = state.guitar[track].struct.length;
            const resetStruct = Array.from({ length: structLength }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            }));

            return {
                guitar: {
                    ...state.guitar,
                    [track]: {
                        ...state.guitar[track],
                        struct: resetStruct,
                        play: true,
                        gain: 1,
                    },
                },
            };
        });
    },

    getGuitarStr: () => {

        /*
        guitar = {
            c: {...}, cs: {...}, d: {...}, ...
        }
        */
        const { guitar } = get();
        const guitarBank = guitar.settings.bank;

        // mute
        if (!guitar.settings.play) return `seq(["~"])`;

        const stack = Object.entries(guitar)    // [["c", {struct: [...], play: true, gain: 1}], ...]
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
                        : `makeNote("${obj.note}", "${guitarBank}", ${obj.gain * gain}, ${obj.release})`
                    ).join(", ") +
                    "])";

                return seq;
            })
            .join(",\n    ");

        return `stack(
        ${stack})`;
    },
}))