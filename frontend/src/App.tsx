import React, { useState } from 'react';
import EnvioArquivo from './componentes/EnvioArquivo';
import SeletorIdioma from './componentes/SeletorIdioma';
import EntradaGlossario from './componentes/EntradaGlossario';
import useTraducao from './hooks/useTraducao';
import { TraducaoServicos } from './types';

const IDIOMAS = [
  { codigo: 'en', nome: 'Inglês' },
  { codigo: 'es', nome: 'Espanhol' },
  { codigo: 'fr', nome: 'Francês' },
  { codigo: 'de', nome: 'Alemão' },
  { codigo: 'it', nome: 'Italiano' },
];

const App: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [idiomaOrigem, setIdiomaOrigem] = useState<string>('pt');
  const [idiomasDestino, setIdiomasDestino] = useState<string[]>([]);
  const [servicoTraducao, setServicoTraducao] = useState<'google' | 'openai'>('google');
  const [glossario, setGlossario] = useState<Record<string, string>>({});
  const { traduzirArquivo, carregando, erro } = useTraducao();

  const lidarComTraduzir = () => {
    if (!arquivo || idiomasDestino.length === 0) {
      alert('Por favor, selecione um arquivo e pelo menos um idioma de destino.');
      return;
    }

    traduzirArquivo(arquivo, idiomaOrigem, idiomasDestino, servicoTraducao, glossario);
  };

  return (
    <div className="App">
      <h1>Tradutor de arquivos i18n</h1>
      <EnvioArquivo aoSelecionarArquivo={setArquivo} />
      <div>
        <h3>Idioma de origem:</h3>
        <select value={idiomaOrigem} onChange={(e) => setIdiomaOrigem(e.target.value)}>
          <option value="pt">Português</option>
        </select>
      </div>
      <div>
        <h3>Idiomas de destino:</h3>
        <SeletorIdioma
          idiomas={IDIOMAS}
          idiomasSelecionados={idiomasDestino}
          aoMudarIdioma={setIdiomasDestino}
        />
      </div>
      <div>
        <h3>Serviço de Tradução:</h3>
        <select value={servicoTraducao} onChange={(e) => setServicoTraducao(e.target.value as TraducaoServicos)}>
          <option value="google">Google Translate</option>
          <option value="openai">OpenAI</option>
        </select>
      </div>
      <EntradaGlossario aoMudarGlossario={setGlossario} />
      <button onClick={lidarComTraduzir} disabled={!arquivo || idiomasDestino.length === 0 || carregando}>
        Traduzir
      </button>
      {carregando && <p>Processando...</p>}
      {erro && <p>{erro}</p>}
    </div>
  );
}

export default App;
