import React from 'react';
import { useGlossario } from './useGlossario';

interface EntradaGlossarioProps {
  aoMudarGlossario: (glossario: Record<string, string>) => void;
}

/**
 * Componente para entrada de termos e definições do glossário.
 * @param {EntradaGlossarioProps} props - As propriedades do componente.
 * @returns {JSX.Element} - O elemento JSX do componente.
 */
const EntradaGlossario: React.FC<EntradaGlossarioProps> = ({ aoMudarGlossario }) => {
  const { entradas, adicionarEntrada, atualizarEntrada } = useGlossario(aoMudarGlossario);

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
