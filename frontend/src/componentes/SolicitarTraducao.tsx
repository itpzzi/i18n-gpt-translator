import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useTraducao from '../hooks/useTraducao';
import { Button } from '@radix-ui/themes';

const SolicitarTraducao: React.FC = () => {
  const { arquivo, idiomaOrigem, idiomasDestino, servicoTraducao, glossario } = useSelector((state: RootState) => state.traducao);
  const { traduzirArquivo, carregando, erro } = useTraducao();

  const lidarComTraduzir = () => {
    if (!arquivo || idiomasDestino.length === 0) {
      alert('Por favor, selecione um arquivo e pelo menos um idioma de destino.');
      return;
    }

    traduzirArquivo(arquivo, idiomaOrigem, idiomasDestino, servicoTraducao, glossario)
      .then(() => {
        alert('Solicitação feita. Aguarde enquanto o ZIP está sendo gerado.');
      })
      .catch(() => {
        alert('Ocorreu um erro ao processar a tradução.');
      });
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Revisão e Solicitação</h2>
      <div className="mb-4">
        <p><strong>Arquivo:</strong> {arquivo?.name || 'Nenhum arquivo selecionado'}</p>
        <p><strong>Idioma de Origem:</strong> {idiomaOrigem}</p>
        <p><strong>Idiomas de Destino:</strong> {idiomasDestino.join(', ')}</p>
        <p><strong>Serviço de Tradução:</strong> {servicoTraducao}</p>
        {servicoTraducao === 'openai' && (
          <p><strong>Glossário:</strong> {glossario ? 'Sim' : 'Não'}</p>
        )}
      </div>
      <Button
        onClick={lidarComTraduzir}
        disabled={carregando}
        className={`py-2 px-4 text-white font-semibold rounded-lg ${carregando ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} transition flex items-center`}
      >
        {carregando && (
          <div className="mr-2">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          </div>
        )}
        {carregando ? 'Gerando ZIP...' : 'Traduzir'}
      </Button>
      {erro && <p className="text-red-500 mt-4">{erro}</p>}
    </>
  );
};

export default SolicitarTraducao;
