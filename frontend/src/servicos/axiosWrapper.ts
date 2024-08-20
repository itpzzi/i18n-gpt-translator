// src/api/AxiosWrapper.ts
import axios, { AxiosInstance } from 'axios';

/**
 * Classe para encapsular a instância do Axios com configuração personalizada.
 */
class AxiosWrapper {
  private instance: AxiosInstance;

  /**
   * Cria uma instância do Axios com a URL base e cabeçalhos padrão.
   * @param baseURL A URL base para as requisições.
   */
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }

  /**
   * Obtém a instância configurada do Axios.
   * @returns A instância do Axios.
   */
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// URL base para a API
const URL_API = 'http://localhost:8000';

// Cria uma instância do AxiosWrapper com a URL base fornecida
const axiosWrapper = new AxiosWrapper(URL_API);

export default axiosWrapper;
