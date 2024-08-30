import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';

// Definindo o tipo para um idioma
interface Idioma {
  codigo: string;
  nome: string;
}

// Tipos das propriedades do componente
interface SeletorIdiomaDestinoProps {
  idiomas: Idioma[];
  idiomasSelecionados: string[];
  aoMudarIdioma: (idiomasSelecionados: string[]) => void;
}

const SeletorIdiomaDestino: React.FC<SeletorIdiomaDestinoProps> = ({ idiomas, idiomasSelecionados, aoMudarIdioma }) => {
  const handleCheckboxChange = (codigo: string) => {
    const novosIdiomasSelecionados = idiomasSelecionados.includes(codigo)
      ? idiomasSelecionados.filter(id => id !== codigo)
      : [...idiomasSelecionados, codigo];
    aoMudarIdioma(novosIdiomasSelecionados);
  };

  return (
    <div>
      <span className="text-lg font-semibold mb-2">Idiomas de destino:</span>
      <div className="space-y-2">
        {idiomas.map(idioma => (
          <div key={idioma.codigo} className="flex items-center">
            <Checkbox.Root
              checked={idiomasSelecionados.includes(idioma.codigo)}
              onCheckedChange={() => handleCheckboxChange(idioma.codigo)}
              className="flex items-center cursor-pointer"
            >
              <div
                className={`w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center ${
                  idiomasSelecionados.includes(idioma.codigo) ? 'bg-green-700' : 'bg-white'
                }`}
              >
                <Checkbox.Indicator>
                  <CheckIcon className={`w-4 h-4 ${idiomasSelecionados.includes(idioma.codigo) ? 'text-white' : 'hidden'}`} />
                </Checkbox.Indicator>
              </div>
              <span className="ml-2 text-sm">{idioma.nome}</span>
            </Checkbox.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeletorIdiomaDestino;
