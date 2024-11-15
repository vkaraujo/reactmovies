export function SortFilter({ sortOrder, handleSortChange, categoria, sortOptions }) {
    return (
        <div className="flex flex-wrap justify-center">
            <select 
                className="w-40 border py-1 px-3 bg-brand-blue-dark" 
                value={sortOrder} 
                onChange={handleSortChange}
            >
                {sortOptions
                    .filter(option => option.appliesTo.includes(categoria))
                    .map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                ))}
            </select>
        </div>
    );
}
