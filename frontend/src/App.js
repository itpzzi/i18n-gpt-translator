import React, { useState } from 'react';
import EnvioArquivo from './componentes/EnvioArquivo';
import SeletorIdioma from './componentes/SeletorIdioma';
import EntradaGlossario from './componentes/EntradaGlossario';
import { traduzirArquivoGoogle, traduzirArquivoOpenAI } from './servicos/api';

const IDIOMAS = [
  { codigo: 'en', nome: 'Inglês' },
  { codigo: 'es', nome: 'Espanhol' },
  { codigo: 'fr', nome: 'Francês' },
  { codigo: 'de', nome: 'Alemão' },
  { codigo: 'it', nome: 'Italiano' },
];

function App() {
  const [arquivo, setArquivo] = useState(null);
  const [idiomaOrigem, setIdiomaOrigem] = useState('pt');
  const [idiomasDestino, setIdiomasDestino] = useState([]);
  const [servicoTraducao, setServicoTraducao] = useState('google');
  const [glossario, setGlossario] = useState({});

  const lidarComTraduzir = async () => {
    if (!arquivo || idiomasDestino.length === 0) {
      alert('Por favor, selecione um arquivo e pelo menos um idioma de destino.');
      return;
    }

    try {
      if (servicoTraducao === 'google') {
        await traduzirArquivoGoogle(arquivo, idiomaOrigem, idiomasDestino);
      } else if (servicoTraducao === 'openai') {
        await traduzirArquivoOpenAI(arquivo, idiomaOrigem, idiomasDestino, glossario);
      }
      alert('Arquivo traduzido com sucesso!');
    } catch (erro) {
      alert('Erro ao traduzir o arquivo. Por favor, tente novamente.');
    }
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
        <select value={servicoTraducao} onChange={(e) => setServicoTraducao(e.target.value)}>
          <option value="google">Google Translate</option>
          <option value="openai">OpenAI</option>
        </select>
      </div>
      <EntradaGlossario aoMudarGlossario={setGlossario} />
      <button onClick={lidarComTraduzir} disabled={!arquivo || idiomasDestino.length === 0}>
        Traduzir
      </button>
    </div>
  );
}

export default App;
