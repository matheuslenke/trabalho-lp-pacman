# Jogo do Pacman

Trabalho de Linguagens de Programação recriando o jogo Pacman em Javascript

## Estrutura de arquivos

Primeiro, uma breve explicação sobre estrutura de arquivos:

```
projeto
│   README.md
│   index.html
│   .eslintrc.json
│   .prettierrc
│   package.json
│   yarn.lock
│   .babelrc
│
└───node_modules
│
└───src
│   │   index.js
│   │
│   └───scenes
│   │   │   GameScene.js
│   │   │   TitleScene.js
│   │   │   ...
│   └───classes
│       │   Fantasma.js
│       │   Pacman.js
│       │   ...
│
└───assets
│   └───audio
│   └───fonts
│   └───images
│   └───tilemaps
│
└───dist
│   └───assets
│   │   bundle.min.js
│   │   index.html
│   │   favicon.ico
│
└───webpack
    │   base.js
    │   prod.js

```

-   Arquivos de configuração:

    -   `.babelrc`, `.eslintrc.json`, `.prettierrc` são arquivos de configuração de estilos/ utilização de features do ES6.
    -   Na pasta `webpack` temos os arquivos de configuração do webpack para desenvolvimento e produção, que basicamente realiza diversas otimizações e roda um servidor http para executarmos nosso projeto (que é uma exigência do Phaser3 para segurança ser rodado com um servidor por trás)

-   Assets:

    -   Todos os arquivos de imagens, audios, tilemaps e fontes estão aqui

-   Código fonte

    -   O código que criamos se encontra todo aqui, sendo o arquivo `index.js` o arquivo de inicialização do Phaser e suas configurações
    -   A pasta `classes` guarda todas as classes criadas que representam os objetos principais do jogo, os Fantasmas (que é uma interface herdada por cada classe específica de fantasma) e o Pacman, e toda a lógica associada aos mesmos
    -   A pasta `scenes` contem as cenas do jogo, sendo a `BootScene` a cena que carrega arquivos iniciais, a `TitleScene` a cena com o título do jogo, a `GameScene` a cena principal do jogo, a `GameOverScene` a cena caso o jogador perca e a `WinScene` caso o jogador vença

-   Código compilado

    -   Com as configurações do Webpack, o código é compilado em um bundle minificado `bundle.min.js` , contendo toda a lógica em um único arquivo, o `index.html` o arquivo de entrada e os assets utilizados copiados para uma pasta

-   node_modules
    -   Os arquivos de todas as bibliotecas utilizadas

## Como Rodar

Primeiramente, certifique-se de possuir o `node` instalado em sua máquina. Todos os testes foram realizados em ambiente `linux` e no navegador `google chrome`. Você também precisa instalado um gerenciador de pacotes, no caso o node já vem com o `npm` mas neste projeto também foi utilizado o `yarn`

### Modo de desenvolvimento

```
    $ npm install
    # ou yarn
    $ npm run dev
```

### Modo de produção

Para compilar o código para produção novamente, caso você tenha realizado modificações:

```
    $ npm install
    # ou yarn
    $ npm run build
```

Agora para rodar o código compilado, você precisa executar como um servidor http o conteúdo da pasta dist. Para isso, recomendo a utilização da extensão [http-server](https://www.npmjs.com/package/http-server)
Para instalá-la, basta rodar:

```
    $ npm install --global http-server
```

Finalmente, rodando a aplicação (caso esteja na raíz do projeto)

```
    $ http-server ./dist
```

O projeto será iniciado na porta 8080!

Por Matheus Lenke e Fernando Bisi
