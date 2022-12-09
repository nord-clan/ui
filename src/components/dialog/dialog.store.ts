import { action, computed, makeObservable, observable } from 'mobx';

export interface IBaseDialogStoreParams {
  delay?: number;
  isNotAnimate?: boolean;
}

interface IBaseDialogStoreState {
  isVisible: boolean;
  isLock: boolean;
}

export class BaseDialogStore {
  private __params?: IBaseDialogStoreParams;

  state = {
    isVisible: false,
    isLock: false
  } as IBaseDialogStoreState;

  constructor(params?: IBaseDialogStoreParams) {
    this.__params = params;

    makeObservable(this, {
      setIsVisible: action,
      setIsLock: action,
      isDialogHidden: computed
    });

    makeObservable(this.state, {
      isVisible: observable,
      isLock: observable
    });
  }

  setIsVisible = (isVisible: boolean): boolean => (this.state.isVisible = isVisible);

  setIsLock = (isLock: boolean): boolean => (this.state.isLock = isLock);

  lockDialog = (): void => {
    this.setIsLock(true);
    const delay = !this.isNotAnimate ? this.__params?.delay ?? 250 : 0;

    setTimeout(() => {
      this.setIsLock(false);
      this.setIsVisible(false);
    }, delay);
  };

  showDialog = (): void => {
    this.setIsVisible(true);
  };

  hideDialog = (withoutLock?: boolean): void => {
    if (withoutLock) {
      this.setIsVisible(false);
    } else {
      this.lockDialog();
    }
  };

  get isDialogHidden(): boolean {
    return !this.state.isLock && !this.state.isVisible;
  }

  get isNotAnimate(): boolean {
    return !!this.__params?.isNotAnimate;
  }
}
