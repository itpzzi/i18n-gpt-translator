import unittest
import json
import tempfile
from src.adaptadores.escritor_de_arquivo_json import EscritorDeArquivoJson
from src.entidades.mensagem import Mensagem

class TestEscritorDeArquivoJson(unittest.TestCase):
    def test_escrever_arquivo_json(self):
        mensagens = [
            Mensagem("chave1", "valor1"),
            Mensagem("chave2", "valor2"),
            Mensagem("nivel1.nivel2.chave3", "valor3"),
            Mensagem("nivel1.nivel2.chave4", "valor4"),
            Mensagem("nivel1.nivel3.chave5", "valor5")
        ]
        
        escritor = EscritorDeArquivoJson()
        
        with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
            escritor.escrever(mensagens, temp_file.name)
        
        with open(temp_file.name, 'r') as file:
            conteudo = json.load(file)
        
        # Verificações para as chaves simples
        self.assertEqual(len(conteudo), 3)  # "chave1", "chave2", "nivel1"
        self.assertEqual(conteudo["chave1"], "valor1")
        self.assertEqual(conteudo["chave2"], "valor2")

        # Verificações para as chaves aninhadas
        self.assertIn("nivel1", conteudo)
        self.assertIn("nivel2", conteudo["nivel1"])
        self.assertIn("nivel3", conteudo["nivel1"])
        self.assertEqual(conteudo["nivel1"]["nivel2"]["chave3"], "valor3")
        self.assertEqual(conteudo["nivel1"]["nivel2"]["chave4"], "valor4")
        self.assertEqual(conteudo["nivel1"]["nivel3"]["chave5"], "valor5")

if __name__ == '__main__':
    unittest.main()
