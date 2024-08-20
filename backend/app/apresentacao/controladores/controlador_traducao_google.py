import json
from typing import List

from fastapi import APIRouter, File, Form, UploadFile
from fastapi.responses import StreamingResponse

from app.aplicacao.servicos.gerador_zip import GeradorZip
from app.aplicacao.servicos.servico_traducao_google import ServicoTraducaoGoogle
from app.dominio.casos_de_uso.traduzir_conteudo_com_google import (
    EntradaTraduzirConteudo,
)
from app.dominio.entidades.solicitacao_traducao_google import SolicitacaoTraducaoGoogle
from app.infraestrutura.repositorios.repositorio_google import (
    RepositorioGoogle,
)

roteador = APIRouter()


@roteador.post("/traduzir")
async def traduzir(
    arquivo: UploadFile = File(...),
    idioma_origem: str = Form(...),
    idiomas_destino: List[str] = Form(...),
):
    conteudo = json.loads(await arquivo.read())

    solicitacao_traducao = SolicitacaoTraducaoGoogle(
        idioma_origem=idioma_origem, idiomas_destino=idiomas_destino, conteudo=conteudo
    )

    repositorio = RepositorioGoogle()
    servico = ServicoTraducaoGoogle(repositorio)

    entrada = EntradaTraduzirConteudo(solicitacao_traducao)
    saida = servico.executar(entrada)

    buffer_zip = GeradorZip.executar(saida.resultado.traducoes, saida.resultado.chaves_i18n)

    return StreamingResponse(
        buffer_zip,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=traducoes.zip"},
    )
