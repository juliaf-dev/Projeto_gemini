import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gerarConteudoMateria } from "../controllers/mainController";
import ChatIA from "./ChatIA";
import "../css/Conteudo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faAtom, faBrain, faLightbulb, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function Conteudo() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [conteudo, setConteudo] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [nivelComplexidade, setNivelComplexidade] = useState(2);
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

    const gerarConteudo = async () => {
      try {
        setCarregando(true);
        let prompt = `Você é um especialista em ${tema}. Crie um conteúdo `;
        
        if (nivelComplexidade === 1) {
          prompt += `introdutório (nível básico):
          - Linguagem simples e acessível
          - Conceitos fundamentais apenas
          - Exemplos do cotidiano`;
        } else if (nivelComplexidade === 2) {
          prompt += `intermediário:
          - Explicações detalhadas
          - 4-5 tópicos principais
          - Exemplos práticos
          - Contexto histórico quando relevante`;
        } else {
          prompt += `avançado:
          - Detalhes técnicos profundos
          - 6+ tópicos principais
          - Estudos de caso
          - Referências acadêmicas
          - Aplicações complexas`;
        }

        const texto = await gerarConteudoMateria(prompt);
        setConteudo(texto);
      } catch (error) {
        setConteudo(`<div class="erro-container">
          <h3>Ooops!</h3>
          <p>Não consegui gerar o conteúdo sobre ${tema}.</p>
          <p>Tente ajustar o nível ou escolher outro tema.</p>
        </div>`);
      } finally {
        setCarregando(false);
      }
    };

    if (tema) gerarConteudo();
  }, [tema, nivelComplexidade]);

  return (
    <div className="conteudo-creativo">
      <div className="hero-tema">
        <button 
          onClick={() => navigate(-1)} 
          className="btn-voltar"
          aria-label="Voltar"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="hero-icon">
          <FontAwesomeIcon icon={icone} />
        </div>
        <h1 className="hero-title">{tema}</h1>
        
        <div className="controle-complexidade">
          <FontAwesomeIcon icon={faSlidersH} />
          <select
            value={nivelComplexidade}
            onChange={(e) => setNivelComplexidade(parseInt(e.target.value))}
            className="nivel-select"
          >
            <option value={1}>Básico</option>
            <option value={2}>Intermediário</option>
            <option value={3}>Avançado</option>
          </select>
        </div>
      </div>

      <div className="conteudo-grid">
        <div className="card-conteudo">
          {carregando ? (
            <div className="loader-creativo">
              <div className="loader-circle"></div>
              <p>Gerando conteúdo {['básico', 'intermediário', 'avançado'][nivelComplexidade-1]}...</p>
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