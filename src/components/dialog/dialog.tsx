import type { FC, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import type { BaseDialogStore } from './dialog.store';
import { DialogWrapperStyle } from './dialog.style';

export interface IDialogProps extends PropsWithChildren {
  store: BaseDialogStore;
  className?: string;
}

//* - COMPONENT ------------------------------------------------------------------------- *//
export const Dialog: FC<IDialogProps> = observer((props) => {
  const { children, store, className } = props;
  const {
    isDialogHidden,
    isNotAnimate,
    state: { isLock, isVisible },
    hideDialog
  } = store;

  return isDialogHidden ? null : (
    <DialogWrapperStyle
      onMouseDown={() => hideDialog()}
      isNotAnimate={isNotAnimate}
      isVisible={isVisible}
      isLock={isLock}>
      <div onMouseDown={(e) => e.stopPropagation()} className={cn('dialog', className)}>
        {children}
      </div>
    </DialogWrapperStyle>
  );
});
