import type { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { useRef, useEffect } from 'react';
import { HiFingerPrint } from 'react-icons/hi';
import { getId } from '../../helpers';
import type { CheckboxStore, ICheckboxStoreParams } from './checkbox.store';
import { CheckboxStyled } from './checkbox.style';

//* - COMPONENT ------------------------------------------------------------------------- *//
export const Checkbox: FC<{ store?: CheckboxStore }> = observer(({ store }) => {
  if (!store) {
    console.error('Error: Checkbox store is null');
    return null;
  }

  const { onClick, label, labelActive } = store.getParams<ICheckboxStoreParams>();
  const { isDisabled, isVisible } = store.state;

  const id = useRef<string>(getId());

  useEffect(() => {
    store.components.add(id.current);
    return () => {
      store.components.remove(id.current);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const handlerOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      if (onClick) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onClick(e as unknown as MouseEvent);
      }
      store.setValue(!store.getValue());
    }
    e.preventDefault();
  };

  return (
    <CheckboxStyled isActive={store.getValue()}>
      <button onClick={handlerOnClick} type="button" key={store.components.refreshKeys[id.current]}>
        {store.getValue() ? labelActive ?? label : label}
      </button>
      <HiFingerPrint />
    </CheckboxStyled>
  );
});
