import { useState } from "react"

export function SearchBar({ onSearch }) {
    const [localSearchQuery, setLocalSearchQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!localSearchQuery.trim()) {
            onSearch("", false);
            return;
        }
        onSearch(localSearchQuery, true);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                placeholder="Search..."
                className="border px-3 py-1 rounded w-60 text-black"
            />
            <button type="submit" className="ml-2 px-3 py-1 bg-brand-blue-dark text-white rounded">
                Search
            </button>
        </form>
    );
}