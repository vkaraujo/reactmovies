import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { Filmes } from "./pages/Filmes"
import { Series } from "./pages/Series"
import { NotFound } from "./pages/NotFound"
import { Detalhes } from "./pages/Detalhes"

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/filmes" element={<Filmes/>} />
            <Route path="/series" element={<Series/>} />
            <Route path="/detalhes/:categoria/:id" element={<Detalhes/>} />

            <Route path="*" element={<NotFound/>} />
        </Routes>
    )
}