import json
from typing import List, Dict, Any
from src.interfaces.escritor_de_arquivo import EscritorDeArquivo
from src.entidades.mensagem import Mensagem

class EscritorDeArquivoJson(EscritorDeArquivo):
    def escrever(self, mensagens: List[Mensagem], caminho_arquivo: str) -> None:
        dados_reconstruidos = {}

        for mensagem in mensagens:
            self._adicionar_chave_aninhada(dados_reconstruidos, mensagem.chave.split('.'), mensagem.valor)
        
        with open(caminho_arquivo, 'w', encoding='utf-8') as arquivo:
            json.dump(dados_reconstruidos, arquivo, ensure_ascii=False, indent=2)
    
    def _adicionar_chave_aninhada(self, dicionario: Dict[str, Any], chaves: List[str], valor: Any) -> None:
        chave_atual = chaves[0]
        if len(chaves) == 1:
            dicionario[chave_atual] = valor
        else:
            if chave_atual not in dicionario:
                dicionario[chave_atual] = {}
            self._adicionar_chave_aninhada(dicionario[chave_atual], chaves[1:], valor)
