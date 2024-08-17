# Script de Tradução i18n

Este script extrai mensagens de um arquivo JSON, as traduz usando uma API de tradução e salva as mensagens traduzidas em novos arquivos JSON.

## Requisitos

- Python 3.7+
- Biblioteca `requests`

## Configuração

1. Instale os pacotes necessários:
> pip install -r requirements.txt
2. Atualize o arquivo `config.py` com sua chave de API de tradução e URL.

3. Modifique o arquivo `main.py` para definir o caminho correto do arquivo de entrada, diretório de saída e idiomas de destino.

## Uso

Execute o script usando:
> python src/main.py

Isso irá gerar arquivos JSON traduzidos no diretório de saída especificado, nomeados de acordo com o padrão `<codigo_idioma>.i18n.json`.