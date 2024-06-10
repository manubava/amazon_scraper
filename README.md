# Web Scraper de Produtos da Amazon

Este é um projeto de web scraper desenvolvido em Node.js que permite buscar e extrair informações sobre produtos da Amazon com base em uma palavra-chave fornecida pelo usuário. O projeto consiste em um backend Node.js que faz scraping das páginas da Amazon e um frontend HTML/CSS/JavaScript para interagir com o usuário.

## Funcionalidades

- Busca por produtos na Amazon com base em uma palavra-chave fornecida pelo usuário.
- Exibição dos resultados da busca com detalhes como título do produto, classificação, número de avaliações e URL da imagem.

## Tecnologias Utilizadas

- Node.js
- Express.js
- Axios
- JSDOM
- Cors

## Como Usar

1. **Instalação das Dependências**: Antes de iniciar o servidor, é necessário instalar as dependências do projeto. No terminal, navegue até a pasta `backend` e execute o comando:

```
npm install
```

2. **Execução do Servidor**: Após instalar as dependências, inicie o servidor Node.js executando o seguinte comando na pasta `backend`:

```
npm start
```

3. **Acesso ao Frontend**: Abra o arquivo `index.html` localizado na pasta `frontend` em um navegador da web para acessar a página de busca de produtos. Para isso, baixe a extensão LIve server, clique no arquivo index.html com o botão direito e depois em "Open with live server". Clique neste botão para abrir o arquivo index.html em um servidor local.

4. **Buscar Produtos**: Na página inicial, insira uma palavra-chave na caixa de pesquisa e clique no botão "Search" para buscar produtos correspondentes na Amazon.

5. **Visualizar Resultados**: Os resultados da busca serão exibidos abaixo da caixa de pesquisa, contendo o título do produto, classificação, número de avaliações e URL da imagem.

