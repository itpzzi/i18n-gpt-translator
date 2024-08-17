from abc import ABC, abstractmethod
from typing import List
from src.entidades.mensagem import Mensagem

class LeitorDeArquivo(ABC):
    @abstractmethod
    def ler(self, caminho_arquivo: str) -> List[Mensagem]:
        pass