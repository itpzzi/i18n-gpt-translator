import unittest
import json
import tempfile
from src.adaptadores.leitor_de_arquivo_json import LeitorDeArquivoJson
from src.entidades.mensagem import Mensagem

class TestLeitorDeArquivoJson(unittest.TestCase):
    def test_ler_arquivo_json(self):
        conteudo = {
            "chave1": "valor1",
            "chave2": "valor2"
        }
        
        with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
            json.dump(conteudo, temp_file)
        
        leitor = LeitorDeArquivoJson()
        mensagens = leitor.ler(temp_file.name)
        
        self.assertEqual(len(mensagens), 2)
        self.assertEqual(mensagens[0].chave, "chave1")
        self.assertEqual(mensagens[0].valor, "valor1")
        self.assertEqual(mensagens[1].chave, "chave2")
        self.assertEqual(mensagens[1].valor, "valor2")

if __name__ == '__main__':
    unittest.main()