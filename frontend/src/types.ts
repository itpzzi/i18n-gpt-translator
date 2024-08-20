export interface Idioma {
    codigo: string;
    nome: string;
}

export type TraducaoServicos = 'google' | 'openai';

export interface Glossario {
    [termo: string]: string;
}
