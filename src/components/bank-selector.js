export default function BankSelector({banks, bank, update}) {

    return (
        <select
            className="dropdown"
            value={bank}
            onChange={(e) => update("settings", { bank: e.target.value })}
        >
        {banks.map((b) => (
            <option key={b.value} value={b.value}>
            {b.label}
            </option>
        ))}
        </select>
    );
}
