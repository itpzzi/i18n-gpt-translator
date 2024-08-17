import unittest
from unittest.mock import patch, Mock
from src.adaptadores.adaptador_openai_traducao import AdaptadorApiOpenAI
from src.entidades.mensagem import Mensagem

class TestAdaptadorApiOpenAI(unittest.TestCase):
    @patch('src.adaptadores.adaptador_openai_traducao.requests.post')
    def test_traduzir(self, mock_post):
        # Configurar o mock para simular uma resposta bem-sucedida da API
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'choices': [{'message': {'content': 'Translated text'}}]
        }
        mock_post.return_value = mock_response

        adaptador = AdaptadorApiOpenAI()
        mensagens = [Mensagem("chave1", "Texto para traduzir")]
        resultado = adaptador.traduzir(mensagens, "en")

        self.assertEqual(len(resultado), 1)
        self.assertEqual(resultado[0].chave, "chave1")
        self.assertEqual(resultado[0].valor, "Translated text")

    @patch('src.adaptadores.adaptador_openai_traducao.requests.post')
    def test_traduzir_erro(self, mock_post):
        # Configurar o mock para simular uma resposta de erro da API
        mock_response = Mock()
        mock_response.status_code = 400
        mock_post.return_value = mock_response

        adaptador = AdaptadorApiOpenAI()
        mensagens = [Mensagem("chave1", "Texto para traduzir")]

        with self.assertRaises(Exception):
            adaptador.traduzir(mensagens, "en")

if __name__ == '__main__':
    unittest.main()