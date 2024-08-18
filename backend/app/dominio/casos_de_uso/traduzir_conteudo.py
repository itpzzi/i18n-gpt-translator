from abc import ABC, abstractmethod
from app.dominio.entidades.solicitacao_traducao import ResultadoTraducao, SolicitacaoTraducao

class EntradaTraduzirConteudo:
    def __init__(self, solicitacao: SolicitacaoTraducao):
        self.solicitacao = solicitacao

class SaidaTraduzirConteudo:
    def __init__(self, resultado: ResultadoTraducao):
        self.resultado = resultado

class CasoDeUsoTraduzirConteudo(ABC):
    @abstractmethod
    def executar(self, entrada: EntradaTraduzirConteudo) -> SaidaTraduzirConteudo:
        pass