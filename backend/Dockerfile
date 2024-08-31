# Usar uma imagem oficial do Python como base
FROM python:3.9-slim

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo de dependências e instalar
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código da aplicação
COPY . .

# Expor as portas para a aplicação e para o depurador
EXPOSE 8000
EXPOSE 5678

# Comando para iniciar a aplicação FastAPI usando Uvicorn com suporte a depuração
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--debug"]
