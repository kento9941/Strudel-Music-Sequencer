export default function addGuitarBar({ instrument, update }) {
    Object.entries(instrument).forEach(([name, inst]) => {
        if (name === "settings") return;

        // add 16 more steps 
        const newSteps = Array.from({ length: 16 }, () => ({
            note: "~",
            gain: 1,
            release: 1,
        }));

        const newStruct = [...inst.struct, ...newSteps];
        update(name, { struct: newStruct });
    });

    // slow +1
    const newSlow = instrument.settings.slow + 1;
    update("settings", { slow: newSlow });
}
