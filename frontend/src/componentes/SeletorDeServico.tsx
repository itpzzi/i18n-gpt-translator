import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useDispatch, useSelector } from 'react-redux';
import EntradaGlossario from './EntradaGlossario';
import { RootState } from '../store';
import { setGlossario, setServicoTraducao } from '../store/traducaoSlice';
import { TraducaoServicos } from '../types';

const SeletorDeServico = () => {
  const dispatch = useDispatch();
  const { servicoTraducao } = useSelector((state: RootState) => state.traducao);

  const handleTabChange = (value: TraducaoServicos) => {
    dispatch(setServicoTraducao(value));
  };

  return (
    <>
      <span className="text-lg font-semibold mb-4 block">Selecione o serviço:</span>
      <Tabs.Root
        defaultValue={servicoTraducao}
        onValueChange={value => handleTabChange(value as TraducaoServicos)}
      >
        <Tabs.List className="flex border-b border-gray-200">
          <Tabs.Trigger
            value="google"
            className={`p-2 px-4 cursor-pointer text-gray-700 border-b-2 ${servicoTraducao === 'google' ? 'border-green-500' : 'border-transparent'} hover:text-green-500 transition`}
          >
            Google Translate
          </Tabs.Trigger>
          <Tabs.Trigger
            value="openai"
            className={`p-2 px-4 cursor-pointer text-gray-700 border-b-2 ${servicoTraducao === 'openai' ? 'border-green-500' : 'border-transparent'} hover:text-green-500 transition`}
          >
            OpenAI
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="google" className="p-4">
          {/* Conteúdo para Google Translate (se necessário) */}
        </Tabs.Content>
        <Tabs.Content value="openai" className="p-4">
          <EntradaGlossario aoMudarGlossario={(glossario) => dispatch(setGlossario(glossario))} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
};

export default SeletorDeServico;
