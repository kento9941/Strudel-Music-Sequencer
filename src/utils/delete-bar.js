export default function deleteBar({instrument, update}) {
    const structLength = Object.values(instrument).find(d => d.struct)?.struct.length ?? 0;

    if (structLength > 32 &&
        window.confirm("Do you want to delete a bar? This action cannot be undone."))
    {
        // delete one bar from every instrument component
        Object.entries(instrument).forEach(([name, inst]) => {
            if (name === "settings") return;

            const newStruct = inst.struct.slice(0, -16);
            update(name, { struct: newStruct });
        });

        // slow -1
        const newSlow = instrument.settings.slow - 1;
        update("settings", { slow: newSlow });
    }

    if (structLength <= 32) return alert("Cannot delete any more bars.");
}