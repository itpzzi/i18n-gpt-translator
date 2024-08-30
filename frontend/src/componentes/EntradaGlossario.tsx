import React from 'react';
import { useGlossario } from './useGlossario';

interface EntradaGlossarioProps {
  aoMudarGlossario: (glossario: Record<string, string>) => void;
}

const EntradaGlossario: React.FC<EntradaGlossarioProps> = ({ aoMudarGlossario }) => {
  const { entradas, adicionarEntrada, atualizarEntrada } = useGlossario(aoMudarGlossario);

  return (
    <div className="space-y-4">
      <span className="text-lg font-semibold mb-4 block">Glossário:</span>
      {entradas.map((entrada, index) => (
        <div key={index} className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Termo"
            value={entrada.termo}
            onChange={(e) => atualizarEntrada(index, 'termo', e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Definição"
            value={entrada.definicao}
            onChange={(e) => atualizarEntrada(index, 'definicao', e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      ))}
      <button
        onClick={adicionarEntrada}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
      >
        Adicionar Termo
      </button>
    </div>
  );
};

export default EntradaGlossario;
