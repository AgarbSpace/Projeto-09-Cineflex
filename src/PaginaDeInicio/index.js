import { useEffect, useState } from "react"
import axios from "axios"
import "./style.css"
import { Link } from "react-router-dom"

export default function PaginaDeInicio(){
    const [filmes, setFilmes] = useState(null);

	useEffect(() => {
		const requisicao = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");

		requisicao.then(resposta => {
			setFilmes(resposta.data);
		});
	}, []);
    
    if(filmes === null) {
        return(
            <section className="loading"> 
                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt = "Carregando"/>
            </section>
        ) 
            
	}
     
    
    return(
        <>
            <section className="listaDeFilmes">
                <span>Selecione o filme</span>
            </section>
            <section className="posterDosFilmes">
                {filmes.map(poster => <Link to = {`/sessoes/${poster.id}`} key = {poster.id} ><img className="poster" src = {poster.posterURL}  alt = {poster.title}/> </Link>)}
            </section>
        </>
    )

}

