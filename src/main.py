import os
from src.adaptadores.leitor_de_arquivo_json import LeitorDeArquivoJson
from src.adaptadores.escritor_de_arquivo_json import EscritorDeArquivoJson
from src.adaptadores.adaptador_openai_traducao import AdaptadorApiOpenAI
from src.casos_de_uso.traduzir_mensagens import TraduzirMensagens

def main():
    arquivo_entrada = 'caminho/para/entrada.json'
    diretorio_saida = 'caminho/para/diretorio/saida'
    idiomas_alvo = ['en', 'es', 'fr']  # Adicione mais idiomas conforme necessário

    leitor_de_arquivo = LeitorDeArquivoJson()
    escritor_de_arquivo = EscritorDeArquivoJson()
    tradutor = AdaptadorApiOpenAI()

    traduzir_mensagens = TraduzirMensagens(leitor_de_arquivo, escritor_de_arquivo, tradutor)

    for idioma in idiomas_alvo:
        arquivo_saida = os.path.join(diretorio_saida, f"{idioma}.i18n.json")
        traduzir_mensagens.executar(arquivo_entrada, arquivo_saida, idioma)
        print(f"Tradução concluída para {idioma}")

if __name__ == "__main__":
    main()