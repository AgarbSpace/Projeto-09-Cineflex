import "./style.css"
import { Link } from "react-router-dom";

export default function SucessoNaReserva({nome, cpf, filme, hora, dia, assentos}){
    
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return(
        <>
            <section className="sucessoDoPedido">
                <span className="pedidoRealizado">Pedido feito com sucesso!</span>
            </section>
            <section className="infos">
                <span className="titulo">Filme e sessao</span>
                <div>
                    <span className="detalhes">{filme}</span>
                    <span className="detalhes">{dia} {hora}</span>
                </div>
            </section>
            <section className="infos">
                <span className="titulo">Ingressos</span>
                <div>
                    {assentos.map(assento => <span className="detalhes">Assento {assento}</span>)}
                </div>
            </section>
            <section className="infos">
                <span className="titulo">Comprador</span>
                <div>
                    <span className="detalhes">Nome: {nome}</span>
                    <span className="detalhes">CPF: {cpf}</span>
                </div>
            </section>
            <section className="final">
            <Link to = "/"><button className="voltarPraHome" >Voltar pra home</button></Link>
            </section>
        </>
    )
}