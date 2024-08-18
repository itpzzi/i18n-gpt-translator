from typing import Dict, List
from app.dominio.casos_de_uso.traduzir_conteudo import CasoDeUsoTraduzirConteudo, EntradaTraduzirConteudo, SaidaTraduzirConteudo
from app.dominio.entidades.solicitacao_traducao import ResultadoTraducao
from app.dominio.repositorios.repositorio_traducao import RepositorioTraducao

class ServicoTraducao(CasoDeUsoTraduzirConteudo):
    def __init__(self, repositorio: RepositorioTraducao):
        self.repositorio = repositorio

    def executar(self, entrada: EntradaTraduzirConteudo) -> SaidaTraduzirConteudo:
        traducoes = {}
        for idioma_destino in entrada.solicitacao.idiomas_destino:
            traducoes[idioma_destino] = self.repositorio.traduzir(
                entrada.solicitacao.conteudo,
                entrada.solicitacao.idioma_origem,
                idioma_destino
            )
        
        chaves_vue = self._gerar_chaves_vue(entrada.solicitacao.conteudo)
        
        resultado = ResultadoTraducao(traducoes=traducoes, chaves_vue=chaves_vue)
        return SaidaTraduzirConteudo(resultado)

    def _gerar_chaves_vue(self, conteudo: Dict[str, any], prefixo: str = "") -> List[str]:
        chaves = []
        for chave, valor in conteudo.items():
            chave_completa = f"{prefixo}.{chave}" if prefixo else chave
            if isinstance(valor, dict):
                chaves.extend(self._gerar_chaves_vue(valor, chave_completa))
            else:
                chaves.append(f"$t('{chave_completa}')")
        return chaves