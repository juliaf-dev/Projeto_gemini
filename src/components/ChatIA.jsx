import React, { useState } from "react";
import { gerarRespostaIA } from "../controllers/mainController";
import "../css/ChatIA.css";

function ChatIA({ tema }) {
  const [expandido, setExpandido] = useState(false);
  const [mensagens, setMensagens] = useState([
    { ia: `Olá! Estou aqui para tirar suas dúvidas. Pergunte o que quiser!` },
  ]);
  const [entrada, setEntrada] = useState("");

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!entrada.trim()) return;

    const novaMensagemUsuario = { usuario: entrada };
    setMensagens((msgs) => [...msgs, novaMensagemUsuario]);
    setEntrada("");

    // Prepara prompt para a IA, pedindo um tom didático
    const prompt = `Você é um assistente de estudos explicando o tema "${tema}". Responda de forma clara e didática: ${entrada}, tome um tom informal e proximo ao usuario`;

    const resposta = await gerarRespostaIA(prompt);
    const novaMensagemIA = { ia: resposta };
    setMensagens((msgs) => [...msgs, novaMensagemIA]);
  };

  return (
    <div className={`chatia-container ${expandido ? "expandido" : ""}`}>
      {expandido ? (
        <div className="chat-box">
          <div className="chat-header">
            <span>Professor Virtual</span>
            <button onClick={() => setExpandido(false)}>X</button>
          </div>
          <div className="chat-mensagens">
            {mensagens.map((msg, index) => (
              <div
                key={index}
                className={`mensagem ${
                  msg.usuario ? "mensagem-usuario" : "mensagem-ia"
                }`}
              >
                {msg.usuario && (
                  <p>
                    <strong>Você:</strong> {msg.usuario}
                  </p>
                )}
                {msg.ia && (
                  <p>
                    <strong>Assistente:</strong> {msg.ia}
                  </p>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={enviarMensagem}>
            <input
              type="text"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Faça sua pergunta ao professor..."
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle" onClick={() => setExpandido(true)}>
          💬
        </button>
      )}
    </div>
  );
}

export default ChatIA;
