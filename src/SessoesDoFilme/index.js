import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams} from "react-router-dom"
import "./style.css"
export default function SessoesDoFilme(){
    
    const [horarios, setHorarios] = useState(null);
    const [poster, setPoster] = useState(null);
    const {idFilme} = useParams();

    
    useEffect(() => {
        const requisicaoHorarios = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`);
        requisicaoHorarios.then(resposta => { 
            setHorarios(resposta.data.days)
        });
    }, [])

    useEffect(() => {
        const requisicaoPoster = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idFilme}/showtimes`);
        requisicaoPoster.then(respostaPoster => {
            setPoster(respostaPoster.data)
        })
    }, [])
    
    if(horarios === null || poster === null) {
        return(
            <section className="loading"> 
                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt = "carregando"/>
            </section>
        ) 
        
	}

    const horario = horarios.map(horario => horario);

    return (
        <>
            <section className="listaDeFilmes">
                <span>Selecione o horário</span>
            </section>
            <section className="horarios">
                {horarios.map(horario => <div className="botoesHorario" key = {horario.id}><span>{horario.weekday} {horario.date}</span>{horario.showtimes.map(hora => <Link to = {`/assentos/${hora.id}`} key = {hora.id}><button className="botaoHorario">{hora.name}</button></Link>)} </div>)}
            </section> 
            <footer>
                <div className="backgroundPoster">
                    <img className="posterFooter" src = {poster.posterURL} alt = {poster.title}/>
                </div>
                <span>{poster.title}</span>
            </footer>
            
        </>
    )
}