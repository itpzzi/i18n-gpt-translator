export interface Idioma {
    codigo: string;
    nome: string;
}

export type TraducaoServico = 'google' | 'openai';

export interface Glossario {
    [termo: string]: string;
}
