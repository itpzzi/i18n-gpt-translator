from dataclasses import dataclass
from typing import Dict, List, Optional


@dataclass
class SolicitacaoTraducaoOpenAI:
    idioma_origem: str
    idiomas_destino: List[str]
    conteudo: Dict[str, any]
    glossario: Optional[Dict[str, str]] = None


@dataclass
class ResultadoTraducaoOpenAI:
    traducoes: Dict[str, Dict[str, any]]
    chaves_i18n: List[str]
