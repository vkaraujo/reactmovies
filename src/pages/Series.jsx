import { Banner } from "../components/Banner";
import { List } from "../components/List";

export function Series(){
    return(
        <>
            <Banner
                titulo="Séries"
                descricao="Confira o que é sucesso nas TVs do mundo!"
                categoria="series" />

            <List categoria="series"/>
        </>
    )
}