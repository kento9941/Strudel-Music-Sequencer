import { create } from "zustand";

export const useStrudelStore = create((set) => ({
    play: null,
    stop: null,
    proc: null,
    isPlaying: false,

    setControls: (controls) => set(controls),
    setPlaying: (isPlaying) => set({ isPlaying })
}))