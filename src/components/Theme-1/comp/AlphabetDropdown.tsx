"use client";

export default function AlphabetDropdown({ slug }: { slug: string }) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        window.location.href = `/all-stores/${val}`;
    };

    const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <select
            className="alpha-dropdown"
            onChange={handleChange}
            value={slug}
        >
            {ALPHABETS.map((alpha) => (
                <option key={alpha} value={alpha}>{alpha}</option>
            ))}
            <option value="other">#</option>
        </select>
    );
}
