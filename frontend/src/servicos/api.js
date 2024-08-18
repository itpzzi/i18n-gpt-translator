import axios from 'axios';

const URL_API = 'http://localhost:8000';

const configurarFormData = (arquivo, idiomaOrigem, idiomasDestino, glossario) => {
  const dadosFormulario = new FormData();
  dadosFormulario.append('arquivo', arquivo);
  dadosFormulario.append('idioma_origem', idiomaOrigem);
  idiomasDestino.forEach(idioma => dadosFormulario.append('idiomas_destino', idioma));
  if (glossario) {
    dadosFormulario.append('glossario', JSON.stringify(glossario));
  }
  return dadosFormulario;
};

const configurarResposta = (resposta, nomeArquivo) => {
  const url = window.URL.createObjectURL(new Blob([resposta.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', nomeArquivo);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const traduzirArquivoGoogle = async (arquivo, idiomaOrigem, idiomasDestino) => {
  const dadosFormulario = configurarFormData(arquivo, idiomaOrigem, idiomasDestino);

  try {
    const resposta = await axios.post(`${URL_API}/google/traduzir`, dadosFormulario, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    configurarResposta(resposta, 'traducoes_google.zip');
  } catch (erro) {
    console.error('Erro ao traduzir o arquivo com Google:', erro);
    throw erro;
  }
};

export const traduzirArquivoOpenAI = async (arquivo, idiomaOrigem, idiomasDestino, glossario) => {
  const dadosFormulario = configurarFormData(arquivo, idiomaOrigem, idiomasDestino, glossario);

  try {
    const resposta = await axios.post(`${URL_API}/openai/traduzir`, dadosFormulario, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    configurarResposta(resposta, 'traducoes_openai.zip');
  } catch (erro) {
    console.error('Erro ao traduzir o arquivo com OpenAI:', erro);
    throw erro;
  }
};