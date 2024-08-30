import React from 'react';
import { Button } from '@radix-ui/themes';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

interface SeletorPorEtapasProps {
  etapaAtual: number;
  etapas: string[];
  proximaEtapa: () => void;
  etapaAnterior: () => void;
}

const SeletorPorEtapas: React.FC<SeletorPorEtapasProps> = ({ etapaAtual, etapas, proximaEtapa, etapaAnterior }) => {
  const obterCorDisco = (index: number) =>
    index <= etapaAtual ? 'bg-green-700 text-white' : 'bg-gray-300 text-gray-500';

  const obterCorLinha = (index: number) =>
    index < etapaAtual ? 'bg-green-700' : 'bg-gray-300';

  const obterCorLegenda = (index: number) =>
    index <= etapaAtual ? 'text-green-700' : 'text-gray-500';

  return (
    <div className="w-full">
      <div className="flex justify-between items-top w-full mb-4">
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
              <p className={`text-xs font-medium ${obterCorLegenda(index)}`}>
                {etapa}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          onClick={etapaAnterior}
          className="mr-4 px-4 py-2  text-gray-700 hover:bg-gray-200 transition duration-200 rounded flex items-center"
          disabled={etapaAtual === 0}
        >
          <ArrowLeftIcon className="mr-2" />
          Anterior
        </Button>
        <Button
          onClick={proximaEtapa}
          className="px-4 py-2  text-gray-700 hover:bg-gray-200 transition duration-200 rounded flex items-center"
          disabled={etapaAtual === etapas.length - 1}
        >
          Próximo
          <ArrowRightIcon className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SeletorPorEtapas;
