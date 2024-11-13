import { Link } from "react-router-dom";
import capaFilmes from "../assets/capa-filmes.jpg";
import capaSeries from "../assets/capa-series.jpg";

export function Home(){
    return(
        <div className="flex h-screen">
            <div className='w-1/2 relative'>
                <Link to={'/filmes'}>
                    <img src={capaFilmes} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all"/>
                </Link>

                <h1 className="absolute z-10 bottom-20 w-full text-center pointer-events-none">Filmes</h1>
            </div>
            <div className='w-1/2 relative'>
                <Link to={'/series'}>
                    <img src={capaSeries} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all"/>
                </Link>

                <h1 className="absolute z-10 bottom-20 w-full text-center pointer-events-none">Séries</h1>
            </div>
        </div>
    )
}