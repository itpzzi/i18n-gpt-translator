from typing import List
from src.interfaces.tradutor import Tradutor
from src.entidades.mensagem import Mensagem

class AdaptadorApiFake(Tradutor):
    def traduzir(self, mensagens: List[Mensagem], idioma_alvo: str) -> List[Mensagem]:
        mensagens_traduzidas = []
        
        for mensagem in mensagens:
            # Simula a "tradução" retornando o valor original
            texto_traduzido = f"[{idioma_alvo}] {mensagem.valor}"
            mensagens_traduzidas.append(Mensagem(mensagem.chave, texto_traduzido))
        
        return mensagens_traduzidas
