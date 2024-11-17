import { Link } from "react-router-dom";
import star from "../assets/star.svg";
import placeholder from "../assets/placeholder.jpg";

export function Card({ item, categoria }) {
    const imageUrl = item.poster_path 
        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` 
        : placeholder;

    return (
        <Link to={`../detalhes/${categoria}/${item.id}`} className="w-[270px] h-[300px] relative" >
            <img className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-all rounded"
                src={imageUrl} alt="poster"/>

            <div className="absolute bottom-2 left-2 pointer-events-none">
                <h2 className="font-bold text-lg">{item.title || item.name}</h2>
                <h3 className="font-bold">Ano {item.first_air_date?.substring(0, 4) || item.release_date?.substring(0, 4)}</h3>

                <div className="flex gap-1 items-center">
                    <img src={star} alt=""/>
                    <span className="font-bold text-brand-yellow">{item.vote_average?.toFixed(1)}</span>
                </div>
            </div>
            
        </Link>        
    );
}