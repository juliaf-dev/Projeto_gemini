import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faSearch } from '@fortawesome/free-solid-svg-icons';

function Main() {
  const [tema, setTema] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tema.trim()) {
      navigate("/conteudo", { state: { tema } });
    }
  };

  return (
    <div className="main-container">
      <div className="main-content">
        <div className="header-section">
          <FontAwesomeIcon icon={faGraduationCap} className="main-icon" />
          <h1>Sobre o que você quer estudar hoje?</h1>
          <p className="subtitle">Digite um tema e geraremos conteúdo personalizado para você</p>
        </div>
        
        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ex: Revolução Francesa, Cálculo Integral, Fotossíntese..."
              required
            />
          </div>
          <button type="submit" className="generate-btn">
            Gerar conteúdo
          </button>
        </form>
      </div>
    </div>
  );
}

export default Main;