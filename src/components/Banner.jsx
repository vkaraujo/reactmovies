export function Banner({titulo, descricao, categoria}){
    const background = 
        categoria == 'filmes' ? 'bg-filmes' 
            : categoria == 'series' ? 'bg-series'
            : 'bg-black';

    return(
        <div className={`${background} bg-cover text-center pt-56 pb-32`}>
            <h1>{titulo}</h1>
            <p className="text-brand-yellow">{descricao}</p>
        </div>
    )
}