import { useEffect, useState } from "react"
import { getData, searchData } from "../api/tmdb"
import { ClimbingBoxLoader } from 'react-spinners';
import { Card } from "./Card";
import { Pagination } from "./Pagination";
import { SortFilter } from "./SortFilter";
import { SearchBar } from "./SearchBar"; 


export function List({categoria}){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("popular");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const sortOptions = [
        { value: "popular", label: "Mais Populares", appliesTo: ["filmes", "series"] },
        { value: "top_rated", label: "Mais Bem Avaliados", appliesTo: ["filmes", "series"] },
        { value: "now_playing", label: "Em Cartaz", appliesTo: ["filmes"] },
        { value: "upcoming", label: "Próximos Lançamentos", appliesTo: ["filmes"] },
        { value: "on_the_air", label: "No Ar", appliesTo: ["series"] },
        { value: "airing_today", label: "Transmitido Hoje", appliesTo: ["series"] },
    ];

    async function loadItems(){
        try{
            setLoading(true)
            
            let data;

            if (isSearching && searchQuery) {
                data = await searchData(categoria, page, searchQuery);
                console.log(data)
            } else {
                data = await getData(categoria, page, sortOrder);
            }
            
            setItems(data)
            setTimeout(()=>{
                setLoading(false)
            }, 500)
            
        }
        
        catch(error){
            console.log("Erro ao buscar dados" + error)
        }
    }

    useEffect(()=>{
        loadItems();
    } ,[page, sortOrder, isSearching]);

    const handleSortChange = (ordem) => {
        setSortOrder(ordem.target.value);
        setPage(1);
        setIsSearching(false);
    };

    const handleSearch = (query, isSearchMode) => {
        setSearchQuery(query);
        setIsSearching(isSearchMode);
        setPage(1);
    };

    if(loading){
        return(
            <div className="flex justify-center items-center h-screen">
                <ClimbingBoxLoader color="#00B1E9" size={15} />
            </div>
            
        )
    }

    return(
        <>
            <div className="max-w-container-site mx-auto">
                <div className="flex justify-between mt-3">
                    <SortFilter sortOrder={sortOrder} handleSortChange={handleSortChange} categoria={categoria} sortOptions={sortOptions} />

                    <SearchBar onSearch={handleSearch} />

                    <Pagination page={page} setPage={setPage}/>
                </div>

                <div className="flex flex-wrap justify-center gap-5 my-16">
                    {
                        items.map(item => (
                            <Card key={item.id} item={item} categoria={categoria} />
                        ))
                    }
                </div>    
            </div>           
        </>
    )
}