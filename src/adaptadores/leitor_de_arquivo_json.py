import json
from typing import List
from src.interfaces.leitor_de_arquivo import LeitorDeArquivo
from src.entidades.mensagem import Mensagem

class LeitorDeArquivoJson(LeitorDeArquivo):
    def ler(self, caminho_arquivo: str) -> List[Mensagem]:
        with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
        
        mensagens = []
        self._processar_dados(dados, mensagens)
        return mensagens

    def _processar_dados(self, dados: dict, mensagens: List[Mensagem], prefixo: str = '') -> None:
        for chave, valor in dados.items():
            chave_completa = f"{prefixo}.{chave}" if prefixo else chave
            if isinstance(valor, dict):
                self._processar_dados(valor, mensagens, chave_completa)
            else:
                mensagens.append(Mensagem(chave_completa, valor))