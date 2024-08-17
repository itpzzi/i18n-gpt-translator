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

    @patch('src.adaptadores.adaptador_openai_traducao.requests.post')
    def test_traduzir_com_chaves_aninhadas(self, mock_post):
        # Configurar o mock para simular uma resposta bem-sucedida da API
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.json.return_value = {
            'choices': [{'message': {'content': 'Texto traduzido aninhado'}}]
        }
        mock_post.return_value = mock_response

        adaptador = AdaptadorApiOpenAI()
        mensagens = [
            Mensagem("erros.carregar_pagina", "Erro ao carregar a página.")
        ]
        resultado = adaptador.traduzir(mensagens, "en")

        self.assertEqual(len(resultado), 1)
        self.assertEqual(resultado[0].chave, "erros.carregar_pagina")
        self.assertEqual(resultado[0].valor, "Texto traduzido aninhado")

    @patch('src.adaptadores.adaptador_openai_traducao.requests.post')
    def test_traduzir_erro_com_chaves_aninhadas(self, mock_post):
        # Configurar o mock para simular uma resposta de erro da API
        mock_response = Mock()
        mock_response.status_code = 400
        mock_post.return_value = mock_response

        adaptador = AdaptadorApiOpenAI()
        mensagens = [
            Mensagem("erros.carregar_pagina", "Erro ao carregar a página.")
        ]

        with self.assertRaises(Exception):
            adaptador.traduzir(mensagens, "en")

if __name__ == '__main__':
    unittest.main()
