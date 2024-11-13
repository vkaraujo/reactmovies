import { Link } from "react-router-dom"
import logo from "../assets/logo.svg";

export function Header(){
    return(
        <div className="bg-brand-dark fixed top-0 z-10 w-full bg-opacity-20 backdrop-blur-sm flex flex-col gap-y-2 md:flex-row justify-between items-center p-6">

            <Link to="/">
                <img src={logo} alt=""></img>
            </Link>

            <nav className="flex gap-14">
                <Link to="/" className="hover:text-brand-blue-light">Início</Link>
                <Link to="/filmes" className="hover:text-brand-blue-light">Filmes</Link>
                <Link to="/series" className="hover:text-brand-blue-light">Séries</Link>
            </nav>
        </div>
    )
}