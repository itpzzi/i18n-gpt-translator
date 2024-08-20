import { useState } from 'react';

// Definindo o tipo para a entrada do glossário
/**
 * Representa uma entrada no glossário.
 * @typedef {Object} EntradaGlossario
 * @property {string} termo - O termo ou palavra do glossário.
 * @property {string} definicao - A definição do termo.
 */
interface EntradaGlossario {
  termo: string;
  definicao: string;
}

// Tipos das propriedades para a função que é chamada quando o glossário é atualizado
/**
 * Função chamada quando o glossário é atualizado.
 * @callback
 * @param {Record<string, string>} glossario - O glossário atualizado, onde as chaves são termos e os valores são definições.
 */

/**
 * Hook personalizado para gerenciar as entradas do glossário.
 * @param {Function} onGlossarioChange - Função chamada quando o glossário é atualizado.
 * @returns {Object} - Retorna o estado e funções relacionadas ao glossário.
 * @returns {EntradaGlossario[]} entradas - O estado das entradas do glossário.
 * @returns {Function} adicionarEntrada - Função para adicionar uma nova entrada ao glossário.
 * @returns {Function} atualizarEntrada - Função para atualizar uma entrada existente no glossário.
 */
export const useGlossario = (onGlossarioChange: (glossario: Record<string, string>) => void) => {
  const [entradas, setEntradas] = useState<EntradaGlossario[]>([{ termo: '', definicao: '' }]);

  /**
   * Adiciona uma nova entrada ao glossário.
   */
  const adicionarEntrada = () => {
    setEntradas([...entradas, { termo: '', definicao: '' }]);
  };

  /**
   * Atualiza uma entrada existente no glossário.
   * @param {number} index - O índice da entrada a ser atualizada.
   * @param {'termo' | 'definicao'} campo - O campo a ser atualizado ('termo' ou 'definicao').
   * @param {string} valor - O novo valor para o campo.
   */
  const atualizarEntrada = (index: number, campo: 'termo' | 'definicao', valor: string) => {
    const novasEntradas = [...entradas];
    novasEntradas[index] = { ...novasEntradas[index], [campo]: valor };
    setEntradas(novasEntradas);

    // Cria um objeto de glossário a partir das entradas
    const glossario = Object.fromEntries(novasEntradas.map(e => [e.termo, e.definicao]));
    onGlossarioChange(glossario);
  };

  return { entradas, adicionarEntrada, atualizarEntrada };
};
