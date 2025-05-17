import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { gerarConteudoMateria } from "../controllers/mainController";
import ChatIA from "./ChatIA";
import "../css/Conteudo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faBrain, faLightbulb } from '@fortawesome/free-solid-svg-icons';

function Conteudo() {
  const { state } = useLocation();
  const [conteudo, setConteudo] = useState("");
  const [carregando, setCarregando] = useState(true);
  const tema = state?.tema || "";
  const [icone, setIcone] = useState(faBrain);

  useEffect(() => {
    const definirIcone = () => {
      const temaLower = tema.toLowerCase();
      if (temaLower.includes("ciência") || temaLower.includes("ciencia")) return faAtom;
      if (temaLower.includes("tecnologia") || temaLower.includes("tech")) return faLightbulb;
      return faBrain;
    };

    setIcone(definirIcone());

    const fetchData = async () => {
      try {
        setCarregando(true);
        const texto = await gerarConteudoMateria(tema);
        setConteudo(texto);
      } catch (error) {
        setConteudo(`
          <div class="erro-container">
            <h3>Ooops!</h3>
            <p>Não consegui gerar o conteúdo sobre ${tema}.</p>
            <p>Tente reformular ou escolher outro tema.</p>
          </div>
        `);
      } finally {
        setCarregando(false);
      }
    };
    
    if (tema) fetchData();
  }, [tema]);

  return (
    <div className="conteudo-creativo">
      <div className="hero-tema">
        <div className="hero-icon">
          <FontAwesomeIcon icon={icone} />
        </div>
        <h1 className="hero-title">{tema}</h1>
      </div>
      
      <div className="conteudo-grid">
        <div className="card-conteudo">
          {carregando ? (
            <div className="loader-creativo">
              <div className="loader-circle"></div>
              <p>Construindo conhecimento...</p>
            </div>
          ) : (
            <div className="conteudo-animado" dangerouslySetInnerHTML={{ __html: conteudo }} />
          )}
        </div>
        
        <div className="card-chat">
          <ChatIA tema={tema} />
        </div>
      </div>
    </div>
  );
}

export default Conteudo;