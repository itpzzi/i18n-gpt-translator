import React from 'react';

const SeletorIdioma = ({ idiomas, idiomasSelecionados, aoMudarIdioma }) => {
  const lidarComMudanca = (e) => {
    const valor = Array.from(e.target.selectedOptions, opcao => opcao.value);
    aoMudarIdioma(valor);
  };

  return (
    <select multiple value={idiomasSelecionados} onChange={lidarComMudanca}>
      {idiomas.map(idioma => (
        <option key={idioma.codigo} value={idioma.codigo}>
          {idioma.nome}
        </option>
      ))}
    </select>
  );
};

export default SeletorIdioma;