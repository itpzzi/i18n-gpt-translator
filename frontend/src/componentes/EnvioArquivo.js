import React, { useState } from 'react';

const EnvioArquivo = ({ aoSelecionarArquivo }) => {
  const [arquivo, setArquivo] = useState(null);

  const lidarComMudancaArquivo = (e) => {
    const arquivoSelecionado = e.target.files[0];
    setArquivo(arquivoSelecionado);
    aoSelecionarArquivo(arquivoSelecionado);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={lidarComMudancaArquivo} />
      {arquivo && <p>Arquivo selecionado: {arquivo.name}</p>}
    </div>
  );
};

export default EnvioArquivo;