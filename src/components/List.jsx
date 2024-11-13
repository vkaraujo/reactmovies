import { useEffect, useState } from "react"
import { getData, searchData } from "../api/tmdb"
import { ClimbingBoxLoader } from 'react-spinners';
import { Card } from "./Card";
import { Pagination } from "./Pagination";


export function List({categoria}){
    // Criando o estado, iniciando um array vazio
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
            
            setItems(data)    // Guarda os dados da API em um estado
            setTimeout(()=>{
                setLoading(false) // desabilida o loading
            }, 500)
            
        }
        
        catch(error){
            console.log("Erro ao buscar dados" + error)
        }
    }

    //Função especial que é executada ao fim da renderização do componente
    useEffect(()=>{
        loadItems();
    } ,[page, sortOrder, isSearching, searchQuery]);

    const handleSortChange = (ordem) => {
        setSortOrder(ordem.target.value);
        setPage(1);
        setIsSearching(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);
        setPage(1);
        loadItems();
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
                    <div className="flex flex-wrap justify-center">
                        <select 
                          className="w-40 border py-1 px-3 bg-brand-blue-dark" 
                          value={sortOrder} 
                          onChange={(e)=>handleSortChange(e)}>
                            {sortOptions
                                .filter(option => option.appliesTo.includes(categoria))
                                .map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                        </select>
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="border px-3 py-1 rounded w-60"
                        />
                        <button type="submit" className="ml-2 px-3 py-1 bg-brand-blue-dark text-white rounded">
                            Search
                        </button>
                    </form>

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