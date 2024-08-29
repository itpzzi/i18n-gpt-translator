import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EnvioArquivo from './componentes/EnvioArquivo';
import SeletorIdioma from './componentes/SeletorIdioma';
import EntradaGlossario from './componentes/EntradaGlossario';
import useTraducao from './hooks/useTraducao';
import SeletorPorEtapas from './componentes/SeletorPorEtapas';
import { RootState } from './store';
import { setEtapaAtual, setArquivo, setIdiomaOrigem, setIdiomasDestino, setServicoTraducao, setGlossario } from './store/traducaoSlice';

const IDIOMAS = [
  { codigo: 'en', nome: 'Inglês' },
  { codigo: 'es', nome: 'Espanhol' },
  { codigo: 'fr', nome: 'Francês' },
  { codigo: 'de', nome: 'Alemão' },
  { codigo: 'it', nome: 'Italiano' },
];

const etapas = [
  'Entry JSON',
  'Select Language',
  'Choose Translations',
  'Select Service',
  'Download ZIP',
];

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { etapaAtual, arquivo, idiomaOrigem, idiomasDestino, servicoTraducao, glossario } = useSelector((state: RootState) => state.traducao);
  const { traduzirArquivo, carregando, erro } = useTraducao();

  const lidarComTraduzir = () => {
    if (!arquivo || idiomasDestino.length === 0) {
      alert('Por favor, selecione um arquivo e pelo menos um idioma de destino.');
      return;
    }

    traduzirArquivo(arquivo, idiomaOrigem, idiomasDestino, servicoTraducao, glossario);
  };

  const proximaEtapa = () => dispatch(setEtapaAtual(Math.min(etapaAtual + 1, etapas.length - 1)));
  const etapaAnterior = () => dispatch(setEtapaAtual(Math.max(etapaAtual - 1, 0)));

  return (
    <div className='min-h-screen flex justify-center items-center bg-green-500'>
      <div className='bg-white p-10 rounded-xl shadow-xl'>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-3 p-4'>
            <h1 className='text-4xl font-bold'>I18N Translator</h1>
            <p>JSON translator and keys generator</p>
          </div>

          <div className='col-span-9 p-4'>
            <SeletorPorEtapas etapaAtual={etapaAtual} etapas={etapas} />
            <div className="mt-8">
              <button
                onClick={etapaAnterior}
                className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded"
              >
                Anterior
              </button>
              <button
                onClick={proximaEtapa}
                className="px-4 py-2 bg-green-700 text-white rounded"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>

        {etapaAtual === 0 && <EnvioArquivo aoSelecionarArquivo={(file) => dispatch(setArquivo(file as File))} />}
        {etapaAtual === 1 && (
          <div>
            <h3>Idioma de origem:</h3>
            <select value={idiomaOrigem} onChange={(e) => dispatch(setIdiomaOrigem(e.target.value))}>
              <option value='pt'>Português</option>
            </select>
          </div>
        )}
        {etapaAtual === 2 && (
          <div>
            <h3>Idiomas de destino:</h3>
            <SeletorIdioma
              idiomas={IDIOMAS}
              idiomasSelecionados={idiomasDestino}
              aoMudarIdioma={(idiomas) => dispatch(setIdiomasDestino(idiomas))}
            />
          </div>
        )}
        {etapaAtual === 3 && (
          <div>
            <h3>Serviço de Tradução:</h3>
            <select value={servicoTraducao} onChange={(e) => dispatch(setServicoTraducao(e.target.value as 'google' | 'openai'))}>
              <option value='google'>Google Translate</option>
              <option value='openai'>OpenAI</option>
            </select>
          </div>
        )}
        {etapaAtual === 4 && (
          <>
            <EntradaGlossario aoMudarGlossario={(glossario) => dispatch(setGlossario(glossario))} />
            <button onClick={lidarComTraduzir} disabled={!arquivo || idiomasDestino.length === 0 || carregando}>
              Traduzir
            </button>
            {carregando && <p>Processando...</p>}
            {erro && <p>{erro}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
