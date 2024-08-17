import os
import requests
from typing import List

from src.interfaces.tradutor import Tradutor
from src.entidades.mensagem import Mensagem

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_API_URL = os.getenv('OPENAI_API_URL')
MODELO_GPT = os.getenv('MODELO_GPT')

class AdaptadorApiOpenAI(Tradutor):
    def traduzir(self, mensagens: List[Mensagem], idioma_alvo: str) -> List[Mensagem]:
        mensagens_traduzidas = []
        headers = {
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        }

        for mensagem in mensagens:
            prompt = f"Traduza o seguinte texto para {idioma_alvo}: \"{mensagem.valor}\""
            dados = {
                "model": MODELO_GPT,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.3
            }

            resposta = requests.post(OPENAI_API_URL, headers=headers, json=dados)
            
            if resposta.status_code == 200:
                conteudo = resposta.json()
                texto_traduzido = conteudo['choices'][0]['message']['content'].strip()
                mensagens_traduzidas.append(Mensagem(mensagem.chave, texto_traduzido))
            else:
                raise Exception(f"Falha na tradução da mensagem: {mensagem.chave}. Status: {resposta.status_code}")

        return mensagens_traduzidas