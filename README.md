# Plataforma de Geração de Conteúdo Educacional com Assistente de Estudos IA

## Visão Geral

Este projeto é uma plataforma web que utiliza a inteligência artificial do Gemini para auxiliar estudantes em seus estudos. Ele oferece duas funcionalidades principais:

1.  **Geração de Conteúdo Educacional Personalizado:** Permite aos usuários gerar conteúdo detalhado sobre qualquer tema, selecionando o nível de complexidade (básico, intermediário ou avançado).

2.  **Assistente de Estudos Interativo com Chat IA:** Integra um assistente de chat IA para responder a perguntas e fornecer suporte contextualizado sobre o tema em estudo.

## Funcionalidades

* **Geração de Conteúdo:** Criação de conteúdo educacional em HTML, com formatação para facilitar a leitura e o aprendizado.
* **Níveis de Complexidade:** Seleção de diferentes níveis de dificuldade para adaptar o conteúdo às necessidades do usuário.
* **Chat IA:** Assistente virtual para tirar dúvidas e aprofundar a compreensão dos temas.
* **Interface Intuitiva:** Design amigável e fácil de usar.
* **Responsividade:** Funciona em dispositivos desktop e móveis.

## Tecnologias

* **Front-end:** React, CSS3, HTML5, FontAwesome
* **IA:** Gemini (Google Generative AI)
* **Outros:** React Router DOM

## Instalação

1.  Clone o repositório:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    ```

2.  Navegue até o diretório do projeto:

    ```bash
    cd <NOME_DO_PROJETO>
    ```

3.  Instale as dependências:

    ```bash
    npm install  # ou yarn install
    ```

4.  Configure a chave da API do Gemini:
    * Crie um arquivo `.env` na raiz do projeto.
    * Adicione a seguinte linha, substituindo `<SUA_CHAVE_API>` pela sua chave:

        ```
        REACT_APP_GEMINI_API_KEY=<SUA_CHAVE_API>
        ```
5.  Execute a aplicação:

    ```bash
    npm start # ou yarn start
    ```

    A plataforma estará disponível em <http://localhost:3000> (ou a porta que estiver configurada).
