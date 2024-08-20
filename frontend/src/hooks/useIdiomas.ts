import { useState } from 'react';
import { Idioma } from '../types';

/**
 * Hook personalizado para gerenciar o estado dos idiomas.
 * @returns Um objeto contendo o estado do idioma de origem, idiomas de destino, e funções para atualizar esses estados.
 */
const useIdiomas = () => {
  const [idiomaOrigem, setIdiomaOrigem] = useState<string>('pt');
  const [idiomasDestino, setIdiomasDestino] = useState<string[]>([]);

  /**
   * Atualiza o idioma de origem.
   * @param idioma O novo idioma de origem.
   */
  const atualizarIdiomaOrigem = (idioma: string) => setIdiomaOrigem(idioma);

  /**
   * Atualiza os idiomas de destino.
   * @param idiomas Os novos idiomas de destino.
   */
  const atualizarIdiomasDestino = (idiomas: string[]) => setIdiomasDestino(idiomas);

  return {
    idiomaOrigem,
    idiomasDestino,
    atualizarIdiomaOrigem,
    atualizarIdiomasDestino,
  };
};

export default useIdiomas;
