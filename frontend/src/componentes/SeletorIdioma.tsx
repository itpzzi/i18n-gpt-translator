import React from 'react';

// Definindo o tipo para um idioma
/**
 * Representa um idioma disponível para seleção.
 * @typedef {Object} Idioma
 * @property {string} codigo - Código do idioma (ex: 'en', 'pt-br').
 * @property {string} nome - Nome do idioma (ex: 'Inglês', 'Português').
 */
interface Idioma {
  codigo: string;
  nome: string;
}

// Tipos das propriedades do componente
interface SeletorIdiomaProps {
  /**
   * Lista de idiomas disponíveis para seleção.
   * @type {Idioma[]}
   */
  idiomas: Idioma[];

  /**
   * Lista de códigos dos idiomas selecionados.
   * @type {string[]}
   */
  idiomasSelecionados: string[];

  /**
   * Função chamada quando a seleção de idiomas muda.
   * @param {string[]} idiomasSelecionados - Códigos dos idiomas selecionados.
   */
  aoMudarIdioma: (idiomasSelecionados: string[]) => void;
}

/**
 * Componente para selecionar idiomas.
 * @param {SeletorIdiomaProps} props - As propriedades do componente.
 * @returns {JSX.Element} - O elemento JSX do componente.
 */
const SeletorIdioma: React.FC<SeletorIdiomaProps> = ({ idiomas, idiomasSelecionados, aoMudarIdioma }) => {
  /**
   * Lida com a mudança na seleção de idiomas.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - O evento de mudança do select.
   */
  const lidarComMudanca = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
