import unittest
import json
import tempfile
from src.adaptadores.escritor_de_arquivo_json import EscritorDeArquivoJson
from src.entidades.mensagem import Mensagem

class TestEscritorDeArquivoJson(unittest.TestCase):
    def test_escrever_arquivo_json(self):
        mensagens = [
            Mensagem("chave1", "valor1"),
            Mensagem("chave2", "valor2")
        ]
        
        escritor = EscritorDeArquivoJson()
        
        with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
            escritor.escrever(mensagens, temp_file.name)
        
        with open(temp_file.name, 'r') as file:
            conteudo = json.load(file)
        
        self.assertEqual(len(conteudo), 2)
        self.assertEqual(conteudo["chave1"], "valor1")
        self.assertEqual(conteudo["chave2"], "valor2")

if __name__ == '__main__':
    unittest.main()