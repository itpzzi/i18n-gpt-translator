# Tradutor de Arquivos i18n

Este projeto consiste em uma aplicação para tradução automática de arquivos de internacionalização (i18n) JSON. Ele inclui um backend em Python usando FastAPI e um frontend em React.

## Estrutura do Projeto
```
projeto/
├── backend/
│   └── ...
├── frontend/
│   └── ...
├── exemplos/
│   ├── entrada/
│   │   └── pt-br.i18n.json
│   └── saida/
│       └── traducoes.zip
|           ├── fr.json
|           ├── en.json
|           └── chaves_i18n.txt
├── .gitignore
└── README.md
```

## Funcionalidades

- Upload de arquivos JSON no formato i18n
- Seleção de idiomas de origem e destino
- Tradução automática do conteúdo
- Download do arquivo ZIP com as traduções

## Pré-requisitos

- Python 3.8+
- Node.js 14+
- npm 6+

## Instalação e Execução

### Backend

1. Navegue até a pasta `backend`:
```bash
cd backend
```

2. Crie um ambiente virtual (opcional, mas recomendado):
```bash
python -m venv venv
source venv/bin/activate  # No Windows use venv\Scripts\activate
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

4. Execute o servidor:
```bash
uvicorn main:app --reload
```

O backend estará rodando em `http://localhost:8000`.

### Frontend
1. Navegue até a pasta `frontend`:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm start
```

O frontend estará rodando em `http://localhost:3000`.

## Uso

1. Acesse `http://localhost:3000` no seu navegador.
2. Faça o upload de um arquivo JSON no formato json pronto para internacionalição (i18n).
3. Selecione o idioma de origem e os idiomas de destino.
4. Clique em "Traduzir".
5. Faça o download do arquivo ZIP com as traduções.

## Exemplos

Na pasta `exemplos`, você encontrará arquivos de exemplo para entrada e saída. Use-os para entender o formato esperado dos arquivos e o resultado da tradução.