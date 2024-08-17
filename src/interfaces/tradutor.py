from abc import ABC, abstractmethod
from typing import List
from src.entidades.mensagem import Mensagem

class Tradutor(ABC):
    @abstractmethod
    def traduzir(self, mensagens: List[Mensagem], idioma_alvo: str) -> List[Mensagem]:
        pass