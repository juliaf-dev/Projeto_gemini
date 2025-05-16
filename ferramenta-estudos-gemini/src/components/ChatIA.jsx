import React, { useState, useRef, useEffect } from "react";
import { gerarRespostaIA } from "../controllers/mainController";
import "../css/ChatIA.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimesCircle, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function ChatIA({ tema }) {
  const [expandido, setExpandido] = useState(false);
  const [mensagens, setMensagens] = useState([
    { 
      origem: 'ia', 
      conteudo: `Olá! Sou seu assistente de estudo. Posso te ajudar com alguma dúvida?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
  ]);
  const [entrada, setEntrada] = useState("");
  const mensagensEndRef = useRef(null);

  const scrollToBottom = () => {
    mensagensEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  const enviarMensagem = async (e) => {
    e.preventDefault();
    if (!entrada.trim()) return;

    const novaMensagemUsuario = { 
      origem: 'usuario', 
      conteudo: entrada,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMensagens((msgs) => [...msgs, novaMensagemUsuario]);
    setEntrada("");

    const prompt = `Você é um Assistente de estudos, estamos estudando ${tema}. Responda de forma clara, didática e bem formatada. 
    Use parágrafos curtos, marcadores quando apropriado e destaque termos importantes. 
    Pergunta: "${entrada}"`;

    try {
      const resposta = await gerarRespostaIA(prompt);
      const novaMensagemIA = { 
        origem: 'ia', 
        conteudo: formatarRespostaIA(resposta),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMensagens((msgs) => [...msgs, novaMensagemIA]);
    } catch (error) {
      const mensagemErro = {
        origem: 'ia',
        conteudo: 'Desculpe, ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMensagens((msgs) => [...msgs, mensagemErro]);
    }
  };

  const formatarRespostaIA = (texto) => {
    // Formata listas com marcadores
    texto = texto.replace(/\n\s*•\s*/g, '\n• ');
    // Formata títulos ou ênfase
    texto = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Preserva quebras de linha
    return texto.split('\n').map((paragrafo, i) => 
      paragrafo.trim() ? `<p key=${i}>${paragrafo}</p>` : ''
    ).join('');
  };

  return (
    <div className={`chatia-container ${expandido ? "expandido" : ""}`}>
      {expandido ? (
        <div className="chat-box">
          <div className="chat-header">
            <button className="close-btn" onClick={() => setExpandido(false)}>
              <FontAwesomeIcon icon={faTimesCircle} />
            </button>
            <div className="chat-title">
              <span>Assistente estudos</span>
            </div>
            
          </div>
          
          <div className="chat-mensagens">
            {mensagens.map((msg, index) => (
              <div key={index} className={`mensagem ${msg.origem}`}>
                <div className="mensagem-conteudo">
                  {msg.origem === 'ia' && (
                    <div className="mensagem-cabecalho">
                      <span>Assistente:</span>
                    </div>
                  )} 
                  <div 
                    className="mensagem-texto" 
                    dangerouslySetInnerHTML={{ __html: msg.conteudo }}
                  />
                  <span className="mensagem-hora">{msg.timestamp}</span>
                  
                </div>
              </div>
            ))}
            <div ref={mensagensEndRef} />
          </div>
          
          <form onSubmit={enviarMensagem} className="chat-input-area">
            <input
              type="text"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Digite sua dúvida"
              className="chat-input"
              autoFocus
            />
            <button type="submit" className="send-btn">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      ) : (
        <button className="chat-toggle" onClick={() => setExpandido(true)}>
          <FontAwesomeIcon icon={faComments} className="toggle-icon" />
          <span>Assistente de {tema}</span>
        </button>
      )}
    </div>
  );
}

export default ChatIA;