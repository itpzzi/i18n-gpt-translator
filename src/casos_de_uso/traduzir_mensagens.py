from typing import List
from src.entidades.mensagem import Mensagem
from src.interfaces.leitor_de_arquivo import LeitorDeArquivo
from src.interfaces.escritor_de_arquivo import EscritorDeArquivo
from src.interfaces.tradutor import Tradutor

class TraduzirMensagens:
    def __init__(self, leitor_de_arquivo: LeitorDeArquivo, escritor_de_arquivo: EscritorDeArquivo, tradutor: Tradutor):
        self.leitor_de_arquivo = leitor_de_arquivo
        self.escritor_de_arquivo = escritor_de_arquivo
        self.tradutor = tradutor

    def executar(self, arquivo_entrada: str, arquivo_saida: str, idioma_alvo: str) -> None:
        mensagens = self.leitor_de_arquivo.ler(arquivo_entrada)
        mensagens_traduzidas = self.tradutor.traduzir(mensagens, idioma_alvo)
        self.escritor_de_arquivo.escrever(mensagens_traduzidas, arquivo_saida)