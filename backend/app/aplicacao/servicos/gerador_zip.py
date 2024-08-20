import io
import json
import zipfile
from typing import Dict, List


class GeradorZip:
    @staticmethod
    def executar(
        traducoes: Dict[str, Dict[str, any]], chaves_i18n: List[str]
    ) -> io.BytesIO:
        buffer_zip = io.BytesIO()
        with zipfile.ZipFile(buffer_zip, "w", zipfile.ZIP_DEFLATED) as arquivo_zip:
            for idioma, conteudo_traduzido in traducoes.items():
                arquivo_zip.writestr(
                    f"{idioma}.json",
                    json.dumps(conteudo_traduzido, indent=2, ensure_ascii=False),
                )

            chaves_i18n_str = "\n".join(chaves_i18n)
            arquivo_zip.writestr("chaves_i18n.txt", chaves_i18n_str)

        buffer_zip.seek(0)
        return buffer_zip
