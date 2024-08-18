from app.aplicacao.servicos.servico_traducao_base import ServicoTraducaoBase
from app.dominio.casos_de_uso.traduzir_conteudo_com_google import (
    CasoDeUsoTraduzirConteudoComGoogle,
    EntradaTraduzirConteudo,
    SaidaTraduzirConteudo,
)
from app.dominio.entidades.solicitacao_traducao_google import ResultadoTraducaoGoogle
from app.infraestrutura.repositorios.repositorio_google import (
    RepositorioGoogle,
)


class ServicoTraducaoGoogle(ServicoTraducaoBase, CasoDeUsoTraduzirConteudoComGoogle):
    def __init__(self, repositorio: RepositorioGoogle):
        self.repositorio = repositorio

    def executar(self, entrada: EntradaTraduzirConteudo) -> SaidaTraduzirConteudo:
        traducoes = {}
        for idioma_destino in entrada.solicitacao.idiomas_destino:
            traducoes[idioma_destino] = self.repositorio.traduzir(
                entrada.solicitacao.conteudo,
                entrada.solicitacao.idioma_origem,
                idioma_destino,
            )

        chaves_i18n = self._gerar_chaves_i18n(entrada.solicitacao.conteudo)

        resultado = ResultadoTraducaoGoogle(
            traducoes=traducoes, chaves_i18n=chaves_i18n
        )
        return SaidaTraduzirConteudo(resultado)
