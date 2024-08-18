from typing import Dict, List


class ServicoTraducaoBase:
    def _gerar_chaves_i18n(
        self, conteudo: Dict[str, any], prefixo: str = ""
    ) -> List[str]:
        chaves = []
        for chave, valor in conteudo.items():
            chave_completa = f"{prefixo}.{chave}" if prefixo else chave
            if isinstance(valor, dict):
                chaves.extend(self._gerar_chaves_i18n(valor, chave_completa))
            else:
                chaves.append(f"$t('{chave_completa}')")
        return chaves
