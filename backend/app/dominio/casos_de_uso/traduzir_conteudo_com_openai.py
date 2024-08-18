from abc import ABC, abstractmethod

from app.dominio.entidades.solicitacao_traducao_openai import (
    ResultadoTraducaoOpenAI,
    SolicitacaoTraducaoOpenAI,
)


class EntradaTraduzirConteudo:
    def __init__(self, solicitacao: SolicitacaoTraducaoOpenAI):
        self.solicitacao = solicitacao


class SaidaTraduzirConteudo:
    def __init__(self, resultado: ResultadoTraducaoOpenAI):
        self.resultado = resultado


class CasoDeUsoTraduzirConteudoComOpenAI(ABC):
    @abstractmethod
    def executar(self, entrada: EntradaTraduzirConteudo) -> SaidaTraduzirConteudo:
        pass
