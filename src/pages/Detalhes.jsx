import { useEffect, useState } from "react";
import { useNavigate, useParams} from "react-router-dom"
import { getDataId } from "../api/tmdb";

export function Detalhes(){
    const {id, categoria} = useParams();
    const navigate = useNavigate();

    const [item, setItem] = useState([]);

    async function loadData(){
        const data = await getDataId(categoria, id);
        setItem(data);
    }

    useEffect(()=>{
        loadData();
    },[]);

    return(
        <>
            <div className="h-[550px]">
                <img className="w-full h-full object-cover object-center" src={`https://image.tmdb.org/t/p/w1280/${item.backdrop_path}`} alt=""/>
            </div>

            <div className="flex max-w-[850px] w-[90%] mt-3 mx-auto lg:absolute lg:top-80 lg:left-[50%] lg:ml-[-425px] bg-brand-dark bg-opacity-50 backdrop-blur-sm items-center gap-8 rounded p-8">
                <img className="hidden lg:block" width={300} src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt=""/>
                <div>
                    <h1>{item.title || item.name}</h1>
                    <ul className="list-disc list-inside my-5">
                        <li>Ano: {item.first_air_date?.substring(0, 4) || item.release_date?.substring(0, 4)}</li>
                        <li>Avaliação: {item.vote_average?.toFixed(1)}</li>
                    </ul>

                    <p>
                        {item.overview}
                    </p>

                    <button 
                        onClick={()=> navigate(`../${categoria}`)} 
                        className="bg-brand-blue-light text-brand-dark py-2 px-10 rounded mt-5 hover:bg-brand-yellow">
                        Voltar</button>
                </div>
            </div>
        </>
        
    )
}