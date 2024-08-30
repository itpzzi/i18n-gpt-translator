import React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';

const recursos = [
  { id: 1, texto: 'Suporta arquivos JSON' },
  { id: 2, texto: 'Gera chaves com pontos' },
  { id: 3, texto: 'Suporta múltiplas traduções' },
  { id: 4, texto: 'Suporta entradas de glossário' },
];

const ListaDeRecursos: React.FC = () => {
  return (
    <>
      <ul className="space-y-2">
        {recursos.map((recurso) => (
          <li key={recurso.id} className="flex items-center space-x-2">
            <CheckIcon className="text-green-500 w-6 h-6" />
            <span className="text-lg">{recurso.texto}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListaDeRecursos;
