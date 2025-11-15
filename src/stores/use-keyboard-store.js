import { create } from "zustand";

export const useKeyboardStore = create((set, get) => ({
    keyboard: {
        settings: {
            play: false,
            bank: "gm_piano",
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

    updateKeyboard: (name, updates) => {
        set((state) => ({
            keyboard: {
                ...state.keyboard,
                [name]: { ...state.keyboard[name], ...updates }
            }
        }))
    },

    updateNote: (track, index, updates) => {
        set((state) => {
            const oldStruct = state.keyboard[track].struct;
            const newStruct = oldStruct.map((obj, i) =>
            i === index ? { ...obj, ...updates } : obj
            );

            return {
            keyboard: {
                ...state.keyboard,
                [track]: {
                    ...state.keyboard[track],
                    struct: newStruct
                }
            }
            };
        });
    },

    resetTrack: (track) => {
        set((state) => {
            const structLength = state.keyboard[track].struct.length;
            const resetStruct = Array.from({ length: structLength }, () => ({
                note: "~",
                gain: 1,
                release: 1,
            }));

            return {
                keyboard: {
                    ...state.keyboard,
                    [track]: {
                        ...state.keyboard[track],
                        struct: resetStruct,
                        play: true,
                        gain: 1,
                    },
                },
            };
        });
    },

    getKeyboardStr: () => {

        /*
        keyboard = {
            c: {...}, cs: {...}, d: {...}, ...
        }
        */
        const { keyboard } = get();
        const keyboardBank = keyboard.settings.bank;

        // mute
        if (!keyboard.settings.play) return `seq(["~"])`;

        const stack = Object.entries(keyboard)    // [["c", {struct: [...], play: true, gain: 1}], ...]
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
                        : `makeNote("${obj.note}", "${keyboardBank}", ${obj.gain * gain}, ${obj.release})`
                    ).join(", ") +
                    "])";

                return seq;
            })
            .join(",\n    ");

        return `stack(
        ${stack})`;
    },
}))