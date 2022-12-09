import React, { useState, useRef } from 'react';
import type { PropsWithChildren, MutableRefObject, FC } from 'react';
import { usePopper } from 'react-popper';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import type { ITooltipController, ITooltipProps } from './tooltip.store';
import { TooltipStore } from './tooltip.store';
import { TooltipStyled } from './tooltip.style';

//* - COMPONENT ------------------------------------------------------------------------- *//
export const Tooltip: FC<
  PropsWithChildren<ITooltipProps> & {
    controllerRef?: MutableRefObject<ITooltipController | undefined>;
  }
> = (props) => {
  const { controllerRef, children, ...restProps } = props;

  const storeRef = useRef<TooltipStore>(new TooltipStore(restProps));

  if (controllerRef) {
    controllerRef.current = storeRef.current.controller;
  }

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!restProps.title) return <>{children}</>;

  return (
    <TooltipStyled>
      <div onMouseEnter={storeRef.current.show} onMouseLeave={storeRef.current.hide} ref={setReferenceElement}>
        {children}
      </div>
      <InnerTooltip store={storeRef.current} referenceElement={referenceElement} />
    </TooltipStyled>
  );
};

const InnerTooltip = observer((props: { store: TooltipStore; referenceElement: HTMLDivElement | null }) => {
  const { isVisible } = props.store.state;

  return !isVisible ? null : <PopperedTooltip {...props} />;
});

interface IPopperedTooltipProps {
  store: TooltipStore;
  referenceElement: HTMLDivElement | null;
}

const PopperedTooltip: FC<IPopperedTooltipProps> = observer((props) => {
  const { store, referenceElement } = props;

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { placement } = store.props;
  const { title, style } = store.state;
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      }
    ]
  });

  return (
    <div className={cn('tooltip', style)} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
      {title}
    </div>
  );
});
