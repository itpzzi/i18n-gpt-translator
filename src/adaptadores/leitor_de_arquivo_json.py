import json
from typing import List
from src.interfaces.leitor_de_arquivo import LeitorDeArquivo
from src.entidades.mensagem import Mensagem

class LeitorDeArquivoJson(LeitorDeArquivo):
    def ler(self, caminho_arquivo: str) -> List[Mensagem]:
        with open(caminho_arquivo, 'r', encoding='utf-8') as arquivo:
            dados = json.load(arquivo)
        return [Mensagem(chave, valor) for chave, valor in dados.items()]