import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { gerarConteudoMateria } from "../controllers/mainController";
import ChatIA from "./ChatIA";
import "../css/Conteudo.css";

function Conteudo() {
  const { state } = useLocation();
  const [conteudo, setConteudo] = useState("");
  const tema = state?.tema || "";

  useEffect(() => {
    const fetchData = async () => {
      const texto = await gerarConteudoMateria(tema);
      setConteudo(texto);
    };
    fetchData();
  }, [tema]);

  return (
    <div className="conteudo-container">
      <h1>{tema}</h1>
      <div dangerouslySetInnerHTML={{ __html: conteudo }} />
      <ChatIA tema={tema} />
    </div>
  );
}

export default Conteudo;