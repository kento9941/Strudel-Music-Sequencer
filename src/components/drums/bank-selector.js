import React, { useState } from "react";
import { useDrumStore } from "../../stores/use-drum-store.js";

export default function BankSelector() {
    const banks = [
        "RolandTR808",
        "RolandTR909",
        "LinnDrum",
        "LinnLM1",
        "AkaiMPC60",
        "RolandTR707",
        "RolandTR606",
        "OberheimDMX",
        "EmuSP12",
        "AlesisSR16"
    ]

    const bank = useDrumStore((state) => state.drums.settings.bank);
    const updateDrum = useDrumStore((state) => state.updateDrum);

    return (
        <select
            className="dropdown"
            value={bank}
            onChange={(e) => updateDrum("settings", { bank: e.target.value })}
        >
        {banks.map((name) => (
            <option key={name} value={name}>
            {name}
            </option>
        ))}
        </select>
    );
}
