// src/hooks/useTraducao.ts
import { useState } from 'react';
import axiosWrapper from '../servicos/axiosWrapper'
import { AxiosResponse } from 'axios';

type TraducaoServicos = 'google' | 'openai';

/**
 * Configura os dados do formulário para envio via FormData.
 * @param arquivo O arquivo a ser enviado.
 * @param idiomaOrigem O idioma de origem.
 * @param idiomasDestino Os idiomas de destino.
 * @param glossario O glossário (opcional).
 * @returns O objeto FormData configurado.
 */
const configurarFormData = (arquivo: File, idiomaOrigem: string, idiomasDestino: string[], glossario?: Record<string, string>): FormData => {
  const dadosFormulario = new FormData();
  dadosFormulario.append('arquivo', arquivo);
  dadosFormulario.append('idioma_origem', idiomaOrigem);
  idiomasDestino.forEach(idioma => dadosFormulario.append('idiomas_destino', idioma));
  if (glossario) {
    dadosFormulario.append('glossario', JSON.stringify(glossario));
  }
  return dadosFormulario;
};

/**
 * Configura o download da resposta do servidor como um arquivo.
 * @param resposta A resposta da requisição.
 * @param nomeArquivo O nome do arquivo para o download.
 */
const configurarResposta = (resposta: AxiosResponse<Blob>, nomeArquivo: string): void => {
  const url = window.URL.createObjectURL(new Blob([resposta.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', nomeArquivo);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * Hook para gerenciar a tradução de arquivos.
 * @returns Um objeto com funções para traduzir arquivos e estados associados.
 */
const useTraducao = () => {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const traduzirArquivo = async (arquivo: File, idiomaOrigem: string, idiomasDestino: string[], servicoTraducao: TraducaoServicos, glossario?: Record<string, string>) => {
    setCarregando(true);
    setErro(null);
    
    try {
      const dadosFormulario = configurarFormData(arquivo, idiomaOrigem, idiomasDestino, glossario);
      const endpoint = servicoTraducao === 'google' ? '/google/traduzir' : '/openai/traduzir';
      const nomeArquivo = servicoTraducao === 'google' ? 'traducoes_google.zip' : 'traducoes_openai.zip';
      
      const resposta = await axiosWrapper.getInstance().post<Blob>(endpoint, dadosFormulario, {
        responseType: 'blob'
      });

      configurarResposta(resposta, nomeArquivo);
    } catch (erro) {
      console.error(`Erro ao traduzir o arquivo com ${servicoTraducao}:`, erro);
      setErro('Erro ao traduzir o arquivo. Por favor, tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return { traduzirArquivo, carregando, erro };
};

export default useTraducao;
