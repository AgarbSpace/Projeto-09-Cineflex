import "./reset.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPagina from "./HeaderDaPagina";
import PaginaDeInicio from "./PaginaDeInicio";
import SelecaoDeAssentos from "./SelecaoDeAssentos";
import SessoesDoFilme from "./SessoesDoFilme";




export default function App(){

    return(
        <BrowserRouter>
        <HeaderPagina/>
        <Routes>
            <Route path = "/" element = {<PaginaDeInicio />}></Route>
            <Route path = "/sessoes/:idFilme" element = {<SessoesDoFilme />}></Route>
            <Route path = "/assentos/:idSessao" element = {<SelecaoDeAssentos/>}></Route>
            <Route path = "/sucesso"></Route>
        </Routes>
        </BrowserRouter>
    )
}