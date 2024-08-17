import requests
from typing import List
from src.interfaces.tradutor import Tradutor
from src.entidades.mensagem import Mensagem
from config import CHAVE_API_TRADUCAO, URL_API_TRADUCAO

class AdaptadorApiTraducao(Tradutor):
    def traduzir(self, mensagens: List[Mensagem], idioma_alvo: str) -> List[Mensagem]:
        mensagens_traduzidas = []
        for mensagem in mensagens:
            params = {
                'texto': mensagem.valor,
                'idioma_alvo': idioma_alvo,
                'chave_api': CHAVE_API_TRADUCAO
            }
            resposta = requests.post(URL_API_TRADUCAO, json=params)
            if resposta.status_code == 200:
                texto_traduzido = resposta.json()['texto_traduzido']
                mensagens_traduzidas.append(Mensagem(mensagem.chave, texto_traduzido))
            else:
                raise Exception(f"Falha na tradução da mensagem: {mensagem.chave}")
        return mensagens_traduzidas