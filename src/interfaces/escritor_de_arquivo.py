from abc import ABC, abstractmethod
from typing import List
from src.entidades.mensagem import Mensagem

class EscritorDeArquivo(ABC):
    @abstractmethod
    def escrever(self, mensagens: List[Mensagem], caminho_arquivo: str) -> None:
        pass