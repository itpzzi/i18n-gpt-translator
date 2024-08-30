import React from 'react';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setIdiomaOrigem } from '../store/traducaoSlice';

const SeletorIdiomaOrigem: React.FC = () => {
  const dispatch = useDispatch();
  const idiomaOrigem = useSelector((state: RootState) => state.traducao.idiomaOrigem);

  return (
    <div>
      <h3>Idioma de origem:</h3>
      <Select.Root value={idiomaOrigem} onValueChange={(idioma) => dispatch(setIdiomaOrigem(idioma))}>
        <Select.Trigger className="inline-flex items-center justify-between bg-white border border-gray-300 px-3 py-2 rounded-md shadow-sm text-sm">
          <Select.Value />
          <Select.Icon className="ml-2">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Content className="bg-white border border-gray-300 rounded-md shadow-lg">
          <Select.ScrollUpButton className="flex items-center justify-center py-1">
            <ChevronDownIcon />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            <Select.Item value="pt" className="px-4 py-2 text-sm hover:bg-gray-100 rounded-md">
              <Select.ItemText>Português (BR)</Select.ItemText>
              <Select.ItemIndicator className="absolute left-0 w-4 inline-flex items-center justify-center">
                <CheckIcon />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center py-1">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default SeletorIdiomaOrigem;
