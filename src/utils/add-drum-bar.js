export default function addDrumBar({instrument, update}) {

    // add one bar to every instrument component
    Object.entries(instrument).forEach(([name, inst]) => {
        if (name === "settings") return;

        const newStruct = [...inst.struct, ...Array(16).fill("~")];
        update(name, { struct: newStruct });
    });

    // slow +1
    const newSlow = instrument.settings.slow + 1;
    update("settings", { slow: newSlow });
}