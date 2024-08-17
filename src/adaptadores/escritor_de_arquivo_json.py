import json
from typing import List
from src.interfaces.escritor_de_arquivo import EscritorDeArquivo
from src.entidades.mensagem import Mensagem

class EscritorDeArquivoJson(EscritorDeArquivo):
    def escrever(self, mensagens: List[Mensagem], caminho_arquivo: str) -> None:
        dados = {mensagem.chave: mensagem.valor for mensagem in mensagens}
        with open(caminho_arquivo, 'w', encoding='utf-8') as arquivo:
            json.dump(dados, arquivo, ensure_ascii=False, indent=2)