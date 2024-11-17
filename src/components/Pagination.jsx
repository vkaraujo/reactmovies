export function Pagination({page, setPage}){
    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    return(
        <div className="">
            <button 
                onClick={handlePreviousPage} 
                disabled={page === 1} 
                className="border py-1 px-2 mr-3 disabled:opacity-50 hover:bg-brand-blue-light disabled:pointer-events-none"
            >
                ←
            </button>
            {page}
            <button 
                onClick={handleNextPage} 
                className="border py-1 px-2 ml-3 hover:bg-brand-blue-light"
            >
                →
            </button>
        </div>
    )
}