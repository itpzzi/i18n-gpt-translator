from typing import Dict

import openai

from app.dominio.repositorios.repositorio_traducao import RepositorioTraducao


class RepositorioOpenAI(RepositorioTraducao):
    def __init__(self, api_key: str):
        openai.api_key = api_key

    def traduzir(
        self,
        conteudo: Dict[str, any],
        idioma_origem: str,
        idioma_destino: str,
        glossario: Dict[str, str],
    ) -> Dict[str, any]:
        conteudo_traduzido = {}
        for chave, valor in conteudo.items():
            if isinstance(valor, dict):
                conteudo_traduzido[chave] = self.traduzir(
                    valor, idioma_origem, idioma_destino, glossario
                )
            else:
                prompt = self._criar_prompt(
                    valor, idioma_origem, idioma_destino, glossario
                )
                response = openai.Completion.create(
                    engine="text-davinci-002", prompt=prompt, max_tokens=100
                )
                conteudo_traduzido[chave] = response.choices[0].text.strip()
        return conteudo_traduzido

    def _criar_prompt(
        self,
        texto: str,
        idioma_origem: str,
        idioma_destino: str,
        glossario: Dict[str, str],
    ) -> str:
        prompt = f"Traduza o seguinte texto de {idioma_origem} para {idioma_destino}:\n\n{texto}\n\n"
        if glossario:
            prompt += "Use o seguinte glossário para contexto:\n"
            for termo, definicao in glossario.items():
                prompt += f"- {termo}: {definicao}\n"
        return prompt
