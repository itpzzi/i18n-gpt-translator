import React from 'react';

interface SeletorPorEtapasProps {
  etapaAtual: number;
  etapas: string[];
}

const SeletorPorEtapas: React.FC<SeletorPorEtapasProps> = ({ etapaAtual, etapas }) => {
  const obterCorDisco = (index: number) =>
    index <= etapaAtual ? 'bg-green-700 text-white' : 'bg-gray-300 text-gray-500';

  const obterCorLinha = (index: number) =>
    index < etapaAtual ? 'bg-green-700' : 'bg-gray-300';

  const obterCorLegenda = (index: number) =>
    index <= etapaAtual ? 'text-green-700' : 'text-gray-500';

  return (
    <div className="flex justify-between items-center w-full">
      {etapas.map((etapa, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div className="relative flex items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${obterCorDisco(index)}`}
            >
              {index + 1}
            </div>
            {index < etapas.length - 1 && (
              <div className="flex-grow h-1">
                <div className={`h-full ${obterCorLinha(index)}`} />
              </div>
            )}
          </div>
          <div className="mt-2 text-center">
            <p className={`text-sm font-medium ${obterCorLegenda(index)}`}>
              {etapa}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeletorPorEtapas;
