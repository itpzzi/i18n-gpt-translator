import React, { useState, ChangeEvent } from 'react';

// Tipos das propriedades do componente
interface EnvioArquivoProps {
  /**
   * Função chamada quando um arquivo é selecionado.
   * @param {File | null} arquivo - O arquivo selecionado ou null se nenhum arquivo for selecionado.
   */
  aoSelecionarArquivo: (arquivo: File | null) => void;
}

/**
 * Componente para seleção de arquivos JSON.
 * @param {EnvioArquivoProps} props - As propriedades do componente.
 * @returns {JSX.Element} - O elemento JSX do componente.
 */
const EnvioArquivo: React.FC<EnvioArquivoProps> = ({ aoSelecionarArquivo }) => {
  // Estado para armazenar o arquivo selecionado
  const [arquivo, setArquivo] = useState<File | null>(null);

  /**
   * Lida com a mudança no input de arquivo.
   * @param {ChangeEvent<HTMLInputElement>} e - O evento de mudança do input.
   */
  const lidarComMudancaArquivo = (e: ChangeEvent<HTMLInputElement>) => {
    const arquivoSelecionado = e.target.files?.[0] || null;
    setArquivo(arquivoSelecionado);
    aoSelecionarArquivo(arquivoSelecionado);
  };

  return (
    <div>
      <input type="file" accept=".json" onChange={lidarComMudancaArquivo} />
      {arquivo && <p>Arquivo selecionado: {arquivo.name}</p>}
    </div>
  );
};

export default EnvioArquivo;
