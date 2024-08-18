from abc import ABC, abstractmethod

from app.dominio.entidades.solicitacao_traducao_google import (
    ResultadoTraducaoGoogle,
    SolicitacaoTraducaoGoogle,
)


class EntradaTraduzirConteudo:
    def __init__(self, solicitacao: SolicitacaoTraducaoGoogle):
        self.solicitacao = solicitacao


class SaidaTraduzirConteudo:
    def __init__(self, resultado: ResultadoTraducaoGoogle):
        self.resultado = resultado


class CasoDeUsoTraduzirConteudoComGoogle(ABC):
    @abstractmethod
    def executar(self, entrada: EntradaTraduzirConteudo) -> SaidaTraduzirConteudo:
        pass
