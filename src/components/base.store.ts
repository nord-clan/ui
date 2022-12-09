import { action, makeObservable, observable } from 'mobx';

export interface IBaseValidator {
  code: string;
  errorMesage: string;
}

export type IValidationErrors = IBaseValidator;

export interface IBaseValidatorExtended extends IBaseValidator {
  func: (store: BaseStore) => boolean;
}

interface IBaseParamsExtended {
  validators?: IBaseValidatorExtended[];
}

export interface IBaseStoreParams extends IBaseParams, IBaseParamsExtended {}

export interface IBaseParams {
  name: string;
  isVisible?: boolean;
  onValidate?: (errors: IValidationErrors[]) => void;
}

export interface IBaseState {
  isVisible: boolean;
}

export class BaseStore {
  private _params: unknown;

  get state(): IBaseState {
    return this._state;
  }

  protected _state: IBaseState;

  getParams = <T>(): T => this._params as T;

  name: string;
  private _validators: IBaseValidatorExtended[];
  protected _childStores = new Map<string, BaseStore>();
  errors: IValidationErrors[] = [];

  constructor(params: IBaseStoreParams, ignoreObserve?: boolean) {
    this._params = params;
    this.name = params.name;
    this._validators = params.validators || [];

    this._state = {
      isVisible: params.isVisible !== undefined ? params.isVisible : true
    };

    if (!ignoreObserve) {
      makeObservable(this.state, {
        isVisible: observable
      });

      makeObservable(this, {
        errors: observable,
        setErrors: action,
        setIsVisible: action
      });
    }
  }

  setIsVisible = (isVisible: boolean): void => {
    this.state.isVisible = isVisible;
  };

  setErrors = (errors: IValidationErrors[]): void => {
    if (this.errors.join() !== errors.join()) {
      this.errors = errors;
    }
  };

  addStore = <T extends BaseStore>(store: T): void => {
    this._childStores.set(store.name, store);
  };

  getStore = <T extends BaseStore>(name: string): T | undefined => {
    const nameArr = name.split(':');
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let store: BaseStore | undefined = this;
    nameArr.forEach((storeKey) => {
      if (store) {
        store = store._childStores.get(storeKey);
      }
    });
    return store as T;
  };

  protected _validateStores = (): IValidationErrors[] => {
    let result: IValidationErrors[] = [];
    Array.from(this._childStores.values()).forEach((f) => (result = result.concat(f.validate())));
    return result;
  };

  validate = (): IValidationErrors[] => {
    const errors = this.errors.concat([]);
    errors.splice(0, errors.length);
    this._validators.forEach((f) => {
      if (!f.func(this)) {
        errors.push({
          code: f.code,
          errorMesage: f.errorMesage
        });
      }
    });

    const result = errors.concat(this._validateStores());
    this.setErrors(result);

    (this._params as IBaseParams).onValidate?.(result);

    return result;
  };
}
