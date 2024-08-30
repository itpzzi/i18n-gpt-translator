import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SeletorDeJSON from './componentes/SeletorDeJSON';
import SeletorPorEtapas from './componentes/SeletorPorEtapas';
import { RootState } from './store';
import { setEtapaAtual } from './store/traducaoSlice';
import SeletorIdiomaOrigem from './componentes/SeletorIdiomaOrigem';
import SeletorIdiomasDestino from './componentes/SeletorIdiomasDestino';
import SeletorDeServico from './componentes/SeletorDeServico';
import SolicitarTraducao from './componentes/SolicitarTraducao';
import ListaDeRecursos from './componentes/ListaDeRecursos';

const etapas = [
  'Entry JSON',
  'Select Language',
  'Choose Translations',
  'Select Service',
  'Download ZIP',
];

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { etapaAtual } = useSelector((state: RootState) => state.traducao);
  const anoAtual = new Date().getFullYear();

  const proximaEtapa = () => dispatch(setEtapaAtual(Math.min(etapaAtual + 1, etapas.length - 1)));
  const etapaAnterior = () => dispatch(setEtapaAtual(Math.max(etapaAtual - 1, 0)));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-7xl">

          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-3 p-4">
              <h1 className="text-4xl font-bold">I18N Translator</h1>
              <p>JSON translator and keys generator</p>
            </div>

            <div className="flex col-span-9 p-4">
              <SeletorPorEtapas
                etapaAtual={etapaAtual}
                etapas={etapas}
                proximaEtapa={proximaEtapa}
                etapaAnterior={etapaAnterior}
              />
            </div>

            <div className="col-span-3">
              <ListaDeRecursos />
            </div>

            <div className="col-span-9">
              {etapaAtual === 0 && <SeletorDeJSON />}
              {etapaAtual === 1 && <SeletorIdiomaOrigem />}
              {etapaAtual === 2 && <SeletorIdiomasDestino />}
              {etapaAtual === 3 && <SeletorDeServico />}
              {etapaAtual === 4 && <SolicitarTraducao />}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-green-800 text-white py-4 text-center">
        <p>© {anoAtual} Ítalo Polazzi</p>
      </footer>
    </div>
  );
};

export default App;
