import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setIdiomaOrigem } from '../store/traducaoSlice';

const SeletorIdiomaOrigem: React.FC = () => {
  const dispatch = useDispatch();
  const idiomaOrigem = useSelector((state: RootState) => state.traducao.idiomaOrigem);

  return (
    <>
      <span className="text-lg font-semibold mb-2">Idioma de origem:</span>
      <Select.Root value={idiomaOrigem} onValueChange={(idioma) => dispatch(setIdiomaOrigem(idioma))}>
        <Select.Trigger aria-placeholder='Idioma' className="inline-flex items-center justify-between  px-3 py-2 rounded-md shadow-sm text-sm">
          <Select.Value />
          <Select.Icon className="ml-2">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content position="popper" className="bg-white border border-gray-300 rounded-md shadow-lg">


          <Select.Viewport className="p-2">
            <Select.Item value="pt" className="px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
              <Select.ItemText>Português (BR)</Select.ItemText>
            </Select.Item>
            <Select.Item value="en" className="px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
              <Select.ItemText>English (US)</Select.ItemText>
            </Select.Item>
          </Select.Viewport>

          <Select.ScrollUpButton className="flex items-center justify-center py-1">
            <ChevronUpIcon />
          </Select.ScrollUpButton>

          <Select.ScrollDownButton className="flex items-center justify-center py-1">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default SeletorIdiomaOrigem;
