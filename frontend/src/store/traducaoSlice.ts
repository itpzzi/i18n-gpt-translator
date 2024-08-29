import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TraducaoState {
  etapaAtual: number;
  arquivo: File | null;
  idiomaOrigem: string;
  idiomasDestino: string[];
  servicoTraducao: 'google' | 'openai';
  glossario: Record<string, string>;
}

const initialState: TraducaoState = {
  etapaAtual: 0,
  arquivo: null,
  idiomaOrigem: 'pt',
  idiomasDestino: [],
  servicoTraducao: 'google',
  glossario: {},
};

const traducaoSlice = createSlice({
  name: 'traducao',
  initialState,
  reducers: {
    setEtapaAtual(state, action: PayloadAction<number>) {
      state.etapaAtual = action.payload;
    },
    setArquivo(state, action: PayloadAction<File>) {
      state.arquivo = action.payload;
    },
    setIdiomaOrigem(state, action: PayloadAction<string>) {
      state.idiomaOrigem = action.payload;
    },
    setIdiomasDestino(state, action: PayloadAction<string[]>) {
      state.idiomasDestino = action.payload;
    },
    setServicoTraducao(state, action: PayloadAction<'google' | 'openai'>) {
      state.servicoTraducao = action.payload;
    },
    setGlossario(state, action: PayloadAction<Record<string, string>>) {
      state.glossario = action.payload;
    },
  },
});

export const {
  setEtapaAtual,
  setArquivo,
  setIdiomaOrigem,
  setIdiomasDestino,
  setServicoTraducao,
  setGlossario,
} = traducaoSlice.actions;

export default traducaoSlice.reducer;
