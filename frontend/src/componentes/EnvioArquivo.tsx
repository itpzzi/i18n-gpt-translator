import React from 'react';
import { TrashIcon, FilePlusIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes';

interface EnvioArquivoProps {
  aoSelecionarArquivo: (file: File | null) => void;
  arquivoSelecionado: File | null;
}

const EnvioArquivo: React.FC<EnvioArquivoProps> = ({ aoSelecionarArquivo, arquivoSelecionado }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    aoSelecionarArquivo(file);
  };

  const removerArquivo = () => {
    aoSelecionarArquivo(null);
  };

  return (
    <div className="w-full">
      <label
        htmlFor="arquivo-upload"
        className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-700 transition"
      >
        {arquivoSelecionado ? (
          <div className="flex items-center justify-center gap-4 w-full px-4">
            <span className="text-lg font-medium text-gray-700 truncate">
              {arquivoSelecionado.name}
            </span>
            <Button
              onClick={removerArquivo}
              className="p-2 bg-red-600 text-white hover:bg-red-800 transition rounded-full shadow-md"
            >
              <TrashIcon className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          <>
            <FilePlusIcon className='text-green-700 size-10' />
            <p className="mt-2 text-sm text-gray-500">Clique ou arraste para adicionar um arquivo</p>
          </>
        )}
        <input
          id="arquivo-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default EnvioArquivo;
