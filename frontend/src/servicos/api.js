import axios from 'axios';

const URL_API = 'http://localhost:8000';  // Ajuste conforme necessário

export const traduzirArquivo = async (arquivo, idiomaOrigem, idiomasDestino) => {
  const dadosFormulario = new FormData();
  dadosFormulario.append('arquivo', arquivo);
  dadosFormulario.append('idioma_origem', idiomaOrigem);
  idiomasDestino.forEach(idioma => dadosFormulario.append('idiomas_destino', idioma));

  try {
    const resposta = await axios.post(`${URL_API}/traduzir`, dadosFormulario, {
      responseType: 'blob',
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    const url = window.URL.createObjectURL(new Blob([resposta.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'traducoes.zip');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (erro) {
    console.error('Erro ao traduzir o arquivo:', erro);
    throw erro;
  }
};