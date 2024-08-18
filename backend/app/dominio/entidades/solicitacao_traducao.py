from dataclasses import dataclass
from typing import List, Dict

@dataclass
class SolicitacaoTraducao:
    idioma_origem: str
    idiomas_destino: List[str]
    conteudo: Dict[str, any]

from dataclasses import dataclass
from typing import Dict, List

@dataclass
class ResultadoTraducao:
    traducoes: Dict[str, Dict[str, any]]
    chaves_vue: List[str]