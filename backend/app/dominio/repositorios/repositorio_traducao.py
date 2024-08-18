from abc import ABC, abstractmethod
from typing import Dict

class RepositorioTraducao(ABC):
    @abstractmethod
    def traduzir(self, conteudo: Dict[str, any], idioma_origem: str, idioma_destino: str) -> Dict[str, any]:
        pass