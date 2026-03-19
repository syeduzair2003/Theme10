"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MobileSearchInput = () => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <form className="mobile-search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search deals, stores, or categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mobile-search-input"
            />
            <button type="submit" className="mobile-search-btn" onClick={handleSubmit}>
                <i className="fa fa-search"></i>
            </button>
        </form>
    );
};

export default MobileSearchInput;