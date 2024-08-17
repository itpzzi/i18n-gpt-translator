import unittest
from unittest.mock import Mock
from src.casos_de_uso.traduzir_mensagens import TraduzirMensagens
from src.entidades.mensagem import Mensagem

class TestTraduzirMensagens(unittest.TestCase):
    def test_executar(self):
        # Criar mocks para as dependências
        mock_leitor = Mock()
        mock_escritor = Mock()
        mock_tradutor = Mock()

        # Configurar o comportamento dos mocks
        mock_leitor.ler.return_value = [Mensagem("chave1", "valor1")]
        mock_tradutor.traduzir.return_value = [Mensagem("chave1", "translated_value1")]

        # Criar o caso de uso com os mocks
        caso_de_uso = TraduzirMensagens(mock_leitor, mock_escritor, mock_tradutor)

        # Executar o caso de uso
        caso_de_uso.executar("arquivo_entrada.json", "arquivo_saida.json", "en")

        # Verificar se os métodos foram chamados corretamente
        mock_leitor.ler.assert_called_once_with("arquivo_entrada.json")
        mock_tradutor.traduzir.assert_called_once()
        mock_escritor.escrever.assert_called_once()

if __name__ == '__main__':
    unittest.main()