import React, { useState } from 'react';
import EnvioArquivo from './componentes/EnvioArquivo';
import SeletorIdioma from './componentes/SeletorIdioma';
import { traduzirArquivo } from './servicos/api';

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

  const lidarComSelecaoArquivo = (arquivoSelecionado) => {
    setArquivo(arquivoSelecionado);
  };

  const lidarComTraduzir = async () => {
    if (!arquivo || idiomasDestino.length === 0) {
      alert('Por favor, selecione um arquivo e pelo menos um idioma de destino.');
      return;
    }

    try {
      await traduzirArquivo(arquivo, idiomaOrigem, idiomasDestino);
      alert('Arquivo traduzido com sucesso!');
    } catch (erro) {
      alert('Erro ao traduzir o arquivo. Por favor, tente novamente.');
    }
  };

  return (
    <div className="App">
      <h1>Tradutor de arquivos i18n</h1>
      <EnvioArquivo aoSelecionarArquivo={lidarComSelecaoArquivo} />
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
      <button onClick={lidarComTraduzir} disabled={!arquivo || idiomasDestino.length === 0}>
        Traduzir
      </button>
    </div>
  );
}

export default App;