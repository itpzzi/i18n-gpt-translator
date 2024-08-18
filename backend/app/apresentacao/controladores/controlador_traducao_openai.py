import json
import os
from typing import Dict, List

from dotenv import load_dotenv
from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import StreamingResponse

from app.aplicacao.servicos.gerador_zip import GeradorZip
from app.aplicacao.servicos.servico_traducao_openai import ServicoTraducaoOpenAI
from app.dominio.casos_de_uso.traduzir_conteudo_com_openai import (
    EntradaTraduzirConteudo,
)
from app.dominio.entidades.solicitacao_traducao_openai import SolicitacaoTraducaoOpenAI
from app.infraestrutura.repositorios.repositorio_openai import RepositorioOpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

roteador = APIRouter()


@roteador.post("/traduzir")
async def traduzir_openai(
    arquivo: UploadFile = File(...),
    idioma_origem: str = Form(...),
    idiomas_destino: List[str] = Form(...),
    glossario: Dict[str, str] = Form(...),
):
    if not glossario:
        raise HTTPException(
            status_code=400, detail="Glossário é necessário para o serviço OpenAI"
        )

    conteudo = json.loads(await arquivo.read())

    solicitacao_traducao = SolicitacaoTraducaoOpenAI(
        idioma_origem=idioma_origem,
        idiomas_destino=idiomas_destino,
        conteudo=conteudo,
        glossario=glossario,
    )

    repositorio_openai = RepositorioOpenAI(OPENAI_API_KEY)
    servico = ServicoTraducaoOpenAI(repositorio_openai, glossario)
    entrada = EntradaTraduzirConteudo(solicitacao_traducao)
    saida = servico.executar(entrada)

    buffer_zip = GeradorZip.gerar_zip(saida.resultado.traducoes, saida.resultado.chaves_i18n)

    return StreamingResponse(
        buffer_zip,
        media_type="application/zip",
        headers={"Content-Disposition": "attachment; filename=traducoes.zip"},
    )
