import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Main.css";

function Main() {
  const [tema, setTema] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/conteudo", { state: { tema } });
  };

  return (
    <div className="main-container">
      <h1>Sobre o que você quer estudar?</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          placeholder="Digite o tema"
        />
        <button type="submit">Gerar conteúdo</button>
      </form>
    </div>
  );
}

export default Main;