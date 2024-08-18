import React, { useState } from 'react';

const EntradaGlossario = ({ aoMudarGlossario }) => {
  const [entradas, setEntradas] = useState([{ termo: '', definicao: '' }]);

  const adicionarEntrada = () => {
    setEntradas([...entradas, { termo: '', definicao: '' }]);
  };

  const atualizarEntrada = (index, campo, valor) => {
    const novasEntradas = [...entradas];
    novasEntradas[index][campo] = valor;
    setEntradas(novasEntradas);
    
    const glossario = Object.fromEntries(novasEntradas.map(e => [e.termo, e.definicao]));
    aoMudarGlossario(glossario);
  };

  return (
    <div>
      <h3>Glossário:</h3>
      {entradas.map((entrada, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Termo"
            value={entrada.termo}
            onChange={(e) => atualizarEntrada(index, 'termo', e.target.value)}
          />
          <input
            type="text"
            placeholder="Definição"
            value={entrada.definicao}
            onChange={(e) => atualizarEntrada(index, 'definicao', e.target.value)}
          />
        </div>
      ))}
      <button onClick={adicionarEntrada}>Adicionar Termo</button>
    </div>
  );
};

export default EntradaGlossario;