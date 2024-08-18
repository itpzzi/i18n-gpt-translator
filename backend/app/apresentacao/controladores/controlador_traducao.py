import json
import zipfile
import io
from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import StreamingResponse
from typing import List
from app.dominio.casos_de_uso.traduzir_conteudo import EntradaTraduzirConteudo
from app.dominio.entidades.solicitacao_traducao import SolicitacaoTraducao
from app.aplicacao.servicos.servico_traducao import ServicoTraducao
from app.infraestrutura.repositorios.repositorio_google_translate import RepositorioGoogleTranslate

roteador = APIRouter()

@roteador.post("/traduzir")
async def traduzir(
    arquivo: UploadFile = File(...),
    idioma_origem: str = Form(...),
    idiomas_destino: List[str] = Form(...)
):
    conteudo = json.loads(await arquivo.read())
    
    solicitacao_traducao = SolicitacaoTraducao(
        idioma_origem=idioma_origem,
        idiomas_destino=idiomas_destino,
        conteudo=conteudo
    )
    
    repositorio = RepositorioGoogleTranslate()
    servico = ServicoTraducao(repositorio)
    
    entrada = EntradaTraduzirConteudo(solicitacao_traducao)
    saida = servico.executar(entrada)
    
    buffer_zip = io.BytesIO()
    with zipfile.ZipFile(buffer_zip, "w", zipfile.ZIP_DEFLATED) as arquivo_zip:
        for idioma, conteudo_traduzido in saida.resultado.traducoes.items():
            arquivo_zip.writestr(f"{idioma}.json", json.dumps(conteudo_traduzido, indent=2, ensure_ascii=False))
        
        chaves_vue = "\n".join(saida.resultado.chaves_vue)
        arquivo_zip.writestr("chaves_vue.txt", chaves_vue)
    
    buffer_zip.seek(0)
    return StreamingResponse(buffer_zip, media_type="application/zip", headers={"Content-Disposition": "attachment; filename=traducoes.zip"})