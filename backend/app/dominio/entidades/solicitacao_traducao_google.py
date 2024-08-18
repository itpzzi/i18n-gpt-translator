from dataclasses import dataclass
from typing import Dict, List


@dataclass
class SolicitacaoTraducaoGoogle:
    idioma_origem: str
    idiomas_destino: List[str]
    conteudo: Dict[str, any]


@dataclass
class ResultadoTraducaoGoogle:
    traducoes: Dict[str, Dict[str, any]]
    chaves_i18n: List[str]
