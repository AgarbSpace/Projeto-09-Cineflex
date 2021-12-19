import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router';
import axios from "axios"
import SucessoNaReserva from "../SucessoNaReserva";
import "./style.css"

export default function SelecaoDeAssentos(){
    const [assentos, setAssentos] = useState(null)
    const [assentosSelecionados, setAssentosSelecionados] = useState([])
    const [sessao, setSessao] = useState(null)
    const [poster, setPoster] = useState(null)
    const [nomeDoComprador, setNomeDoComprador] = useState("")
    const [cpf, setCpf] = useState("")
    const [situacaoDaReserva, setSituacaoDaReserva] = useState("nao reservado")
    const [nomeDoAssento, setNomeDoAssento] = useState([])
    let navegacao = useNavigate();
    const {idSessao} = useParams()

    useEffect(() => {
        const requisicaoAssentos = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`)
        requisicaoAssentos.then(resposta => {
            setAssentos(resposta.data.seats)
        })
    }, [])

    useEffect(() => {
        const requisicaoPoster = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        requisicaoPoster.then(respostaPoster => {
            setPoster(respostaPoster.data.movie)
        })
    }, [])
    
    useEffect(() => {
        const requisicaoSessao = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSessao}/seats`);
        requisicaoSessao.then(respostaPoster => {
            setSessao(respostaPoster.data)
        })
    }, [])

    if(assentos === null || poster === null || sessao === null) {
        return(
            <section className="loading"> 
                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt = "carregando"/>
            </section>
        ) 
        
	}

    function selecionarAssento (e, idAssento, nomeDoAssentoSelecionado){
        if(e.classList.contains("selecionado") === true){
            e.classList.remove("selecionado");
            nomeDoAssento.splice(nomeDoAssento.indexOf(nomeDoAssentoSelecionado), 1);
            assentosSelecionados.splice(assentosSelecionados.indexOf(idAssento), 1);
            setAssentosSelecionados([...assentosSelecionados]);
        }else{
            e.classList.add("selecionado");
            setAssentosSelecionados([...assentosSelecionados, idAssento]);
            setNomeDoAssento([...nomeDoAssento, nomeDoAssentoSelecionado]);
        }
    }

    if(situacaoDaReserva === "reservado"){  
        return (
            <>
            <SucessoNaReserva cpf = {cpf}
            nome = {nomeDoComprador}
            filme = {poster.title}
            hora = {sessao.name}
            diaDaSemana = {sessao.day.weekday}
            dia = {sessao.day.date}
            assentos = {nomeDoAssento}/>
            </>
        )

    }

    return(
        <>
            <section className="listaDeFilmes">
                <span>Selecione o(s) assento(s)</span>
            </section>
            <section className="assentos">
                {assentos.map(assentosSessao => <button key = {assentosSessao.id}
                 className={(assentosSessao.isAvailable === true) ? "assento" : 'assento indisponivel'} 
                 onClick={(e) => selecionarAssento(e.target, assentosSessao.id, assentosSessao.name)} >{assentosSessao.name}</button>)}
            </section>

            <section className="legenda">
                <div className="botaoLegenda">
                    <button className="assento selecionado"></button>
                    <span>Selecionado</span>
                </div>
                <div className="botaoLegenda">
                    <button className="assento"></button>
                    <span>Disponivel</span>
                </div>
                <div className="botaoLegenda">
                    <button className="assento indisponivel"></button>
                    <span>Indisponivel</span>
                </div>   
            </section>

            <section className="informacoes">
                <div className="caixaInput">
                    <span>Nome do comprador:</span>
                    <input type = "text" placeholder="Digite seu nome..." onChange = {(e) => setNomeDoComprador(e.target.value)} value={nomeDoComprador}></input>
                </div>
                <div className="caixaInput cpf">
                    <span>CPF do comprador:</span>
                    <input type = "text" placeholder="Digite seu CPF..." onChange = {(e) => {setCpf(e.target.value)}}></input>
                </div>
            </section>
            
            <section className="finalizarReserva">
                <button className="botaoReservarAssento" onClick = {() => validarDados(nomeDoComprador, setNomeDoComprador, cpf, setCpf, assentosSelecionados, setSituacaoDaReserva, navegacao)}>Reservar assento(s)</button>
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

function validarDados(nome, setNomeDoComprador, cpf, setCpf, assentosSelecionados, setSituacaoDaReserva, navegacao){
    
    if(nome.length < 5){
        alert("Por favor, insira um nome válido")
        setNomeDoComprador("");
        return false;
    }

    if (typeof cpf !== "string"){
        alert("Insira um Cpf válido")
        setCpf("");
        return false;
    }

    cpf = cpf.replace(/[\s.-]*/igm, '')

    if (
        !cpf ||
        cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999" 
    ) {
        alert("Insira um Cpf válido")
        setCpf("");
        return false;
    }
    let soma = 0
    let resto

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
        resto = (soma * 10) % 11
    }

    if ((resto === 10) || (resto === 11)){
        resto = 0  
    }  

    if (resto !== parseInt(cpf.substring(9, 10)) ) {
        alert("Insira um Cpf válido")
        setCpf("");
        return false;
    }

    soma = 0

    for (let i = 1; i <= 10; i++){ 
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
        resto = (soma * 10) % 11
    }

    if ((resto === 10) || (resto === 11)){
          resto = 0
    }

    if (resto !== parseInt(cpf.substring(10, 11) ) ){
        alert("Insira um Cpf válido")
        setCpf("");
        return false;
    }

    const dados = {
        ids: assentosSelecionados,
        name: nome,
        cpf: cpf
    }
    if(assentosSelecionados.length > 0){
        const promessa = axios.post(`https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many`, dados);
        promessa.then(alert(`${nome} Seu(s) ingresso(s) foram reservados com sucesso!`))
        setSituacaoDaReserva("reservado")
    }

}
