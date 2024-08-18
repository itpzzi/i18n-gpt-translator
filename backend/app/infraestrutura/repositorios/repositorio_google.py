from typing import Dict

from googletrans import Translator

from app.dominio.repositorios.repositorio_traducao import RepositorioTraducao


class RepositorioGoogle(RepositorioTraducao):
    def __init__(self):
        self.tradutor = Translator()

    def traduzir(
        self, conteudo: Dict[str, any], idioma_origem: str, idioma_destino: str
    ) -> Dict[str, any]:
        conteudo_traduzido = {}
        for chave, valor in conteudo.items():
            if isinstance(valor, dict):
                conteudo_traduzido[chave] = self.traduzir(
                    valor, idioma_origem, idioma_destino
                )
            else:
                conteudo_traduzido[chave] = self.tradutor.translate(
                    valor, src=idioma_origem, dest=idioma_destino
                ).text
        return conteudo_traduzido
