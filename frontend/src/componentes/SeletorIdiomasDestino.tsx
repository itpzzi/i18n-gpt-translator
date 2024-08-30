import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { RootState } from '../store';
import { setIdiomasDestino } from '../store/traducaoSlice';
import { useDispatch, useSelector } from 'react-redux';

const IDIOMAS = [
  { codigo: 'en', nome: 'Inglês' },
  { codigo: 'es', nome: 'Espanhol' },
  { codigo: 'fr', nome: 'Francês' },
  { codigo: 'de', nome: 'Alemão' },
  { codigo: 'it', nome: 'Italiano' },
];

// Definindo o tipo para um idioma
interface Idioma {
  codigo: string;
  nome: string;
}

const SeletorIdiomaDestino: React.FC = () => {
  const dispatch = useDispatch();
  const idiomasDestino = useSelector((state: RootState) => state.traducao.idiomasDestino);

  const handleCheckboxChange = (codigo: string) => {
    const novosIdiomasSelecionados = idiomasDestino.includes(codigo)
      ? idiomasDestino.filter(id => id !== codigo)
      : [...idiomasDestino, codigo];

      dispatch(setIdiomasDestino(novosIdiomasSelecionados));
  };

  return (
    <div>
      <span className="text-lg font-semibold mb-2">Idiomas de destino:</span>
      <div className="space-y-2">
        {IDIOMAS.map((idioma: Idioma) => (
          <div key={idioma.codigo} className="flex items-center">
            <Checkbox.Root
              checked={idiomasDestino.includes(idioma.codigo)}
              onCheckedChange={() => handleCheckboxChange(idioma.codigo)}
              className="flex items-center cursor-pointer"
            >
              <div
                className={`w-6 h-6 border-2 border-gray-300 rounded flex items-center justify-center ${idiomasDestino.includes(idioma.codigo) ? 'bg-green-700' : 'bg-white'
                  }`}
              >
                <Checkbox.Indicator>
                  <CheckIcon className={`w-4 h-4 ${idiomasDestino.includes(idioma.codigo) ? 'text-white' : 'hidden'}`} />
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
