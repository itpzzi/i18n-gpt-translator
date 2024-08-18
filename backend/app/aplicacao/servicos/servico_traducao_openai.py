from typing import Dict

from app.aplicacao.servicos.servico_traducao_base import ServicoTraducaoBase
from app.dominio.casos_de_uso.traduzir_conteudo_com_openai import (
    CasoDeUsoTraduzirConteudoComOpenAI,
    EntradaTraduzirConteudo,
    SaidaTraduzirConteudo,
)
from app.dominio.entidades.solicitacao_traducao_openai import ResultadoTraducaoOpenAI
from app.infraestrutura.repositorios.repositorio_openai import RepositorioOpenAI


class ServicoTraducaoOpenAI(ServicoTraducaoBase, CasoDeUsoTraduzirConteudoComOpenAI):
    def __init__(self, repositorio: RepositorioOpenAI, glossario: Dict[str, str]):
        self.repositorio = repositorio
        self.glossario = glossario

    def executar(
        self, entrada: EntradaTraduzirConteudo
    ) -> SaidaTraduzirConteudo:
        traducoes = {}
        for idioma_destino in entrada.solicitacao.idiomas_destino:
            traducoes[idioma_destino] = self.repositorio.traduzir(
                entrada.solicitacao.conteudo,
                entrada.solicitacao.idioma_origem,
                idioma_destino,
                self.glossario,
            )

        chaves_i18n = self._gerar_chaves_i18n(entrada.solicitacao.conteudo)

        resultado = ResultadoTraducaoOpenAI(
            traducoes=traducoes, chaves_i18n=chaves_i18n
        )
        return SaidaTraduzirConteudo(resultado)
