from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging
from colorama import Fore, Style, init

init(autoreset=True)

class ColoredFormatter(logging.Formatter):
    def format(self, record):
        level = record.levelname
        if level == 'INFO':
            color = Fore.GREEN
        elif level == 'WARNING':
            color = Fore.YELLOW
        elif level == 'ERROR':
            color = Fore.RED
        elif level == 'CRITICAL':
            color = Fore.RED + Style.BRIGHT
        else:
            color = Fore.WHITE
        
        return color + super().format(record) + Style.RESET_ALL

formatter = ColoredFormatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler = logging.StreamHandler()
handler.setFormatter(formatter)

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
logger.addHandler(handler)

from app.apresentacao.controladores.controlador_traducao_google import roteador as roteador_google
from app.apresentacao.controladores.controlador_traducao_openai import roteador as roteador_openai

app = FastAPI()

# Configuração do CORS
origins = [
    "http://localhost:3000",  # Frontend local
    "https://example.com",    # Substitua pelo seu domínio se estiver em produção
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os cabeçalhos
)

app.include_router(roteador_google, prefix="/google")
app.include_router(roteador_openai, prefix="/openai")

if __name__ == "__main__":
    import uvicorn
    logger.info("Iniciando o servidor Uvicorn")
    uvicorn.run(app, host="0.0.0.0", port=8000)
