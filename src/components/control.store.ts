import type { MutableRefObject } from 'react';
import { action, makeObservable, observable } from 'mobx';
import type { Size } from '../helpers';
// eslint-disable-next-line import/no-cycle
import { getId } from '../helpers';
import type { IBaseParams, IBaseState, IBaseStoreParams, IBaseValidator, IValidationErrors } from './base.store';
import { BaseStore } from './base.store';

export interface IControlValidator<T> extends IBaseValidator {
  func: (store: ControlStore<T>, value?: T) => boolean;
}

interface IControlStoreParamsExtended<T> {
  validators?: IControlValidator<T>[];
}

export interface IControlStoreParams<T> extends IBaseParams, IControlStoreParamsExtended<T> {
  className?: string | (<U extends ControlStore<T>>(store: U) => string);
  placeholder?: string;
  label?: string;
  onChange?: (value: T) => void;
  defaultValue?: T;
  size?: Size;
  isDisabled?: boolean;
  onSetDisabled?: (value: boolean) => void;
  isRequired?: boolean;
  onSetRequired?: (value: boolean) => void;
  isReadOnly?: boolean;
  isNoErrors?: boolean;
}

interface IControlState extends IBaseState {
  isFocused: boolean;
  hasValue: boolean;
  isDisabled: boolean;
  isRequired: boolean;
  isReadOnly: boolean;
}

export class ControlStore<T> extends BaseStore {
  components = {
    ids: [] as string[],
    refreshKeys: {} as { [key: string]: string },
    refs: {} as { [key: string]: MutableRefObject<HTMLElement | undefined> | undefined },
    add(id: string, ref?: MutableRefObject<HTMLElement | undefined>): void {
      this.ids.push(id);
      this.setKey(id, '');
      this.refs[id] = ref;
    },
    remove(id: string): void {
      this.ids = this.ids.filter((f) => f !== id);
      delete this.refreshKeys[id];
      delete this.refs[id];
    },
    setKey: (id: string, key: string): void => {
      this.components.refreshKeys[id] = key;
    }
  };

  get state(): IControlState {
    return this._state as IControlState;
  }

  private _data: T | undefined;

  private controlValidators: IControlValidator<T>[];

  private get controlParams(): IControlStoreParams<T> {
    return this.getParams<IControlStoreParams<T>>();
  }

  constructor(params: IControlStoreParams<T>) {
    super(params as IBaseStoreParams);
    this._data = params.defaultValue;
    this.controlValidators = params.validators || [];

    this.state.hasValue = false;
    this.state.isDisabled = !!params.isDisabled;
    this.state.isRequired = !!params.isRequired;
    this.state.isReadOnly = !!params.isReadOnly;
    this.state.isFocused = false;

    this.setHasValue();
    params.size = params.size || 'm';

    makeObservable(this.components, {
      refreshKeys: observable,
      setKey: action,
      remove: action
    });

    makeObservable(this.state, {
      hasValue: observable,
      isFocused: observable,
      isRequired: observable,
      isDisabled: observable,
      isReadOnly: observable
    });

    makeObservable(this, {
      setIsFocused: action,
      setHasValue: action,
      setIsDisabled: action,
      setIsRequired: action,
      setIsReadOnly: action
    });
  }

  getErrorsSuffix = (number: number): string => {
    const lastNumber = parseInt(number.toString()[number.toString().length - 1], 10);
    // eslint-disable-next-line no-nested-ternary
    return number > 5 && number < 21 ? 'ок' : lastNumber === 1 ? 'ка' : 'ки';
  };

  setIsRequired = (isRequired: boolean): void => {
    this.state.isRequired = isRequired;
    if (this.controlParams.onSetRequired) {
      this.controlParams.onSetRequired(isRequired);
    }
    this.validate();
  };

  setIsDisabled = (isDisabled: boolean): void => {
    this.state.isDisabled = isDisabled;
    this.controlParams.onSetDisabled?.(isDisabled);
  };

  setIsReadOnly = (isReadOnly: boolean): void => {
    this.state.isReadOnly = isReadOnly;
  };

  setIsFocused = (isFocused: boolean): void => {
    this.state.isFocused = isFocused;
  };

  setHasValue = (): void => {
    this.state.hasValue = this._data !== undefined && (this._data as unknown) !== '';
  };

  setValue = (data: T, focusedId?: string, validate = true): void => {
    if (JSON.stringify(data) !== JSON.stringify(this._data)) {
      this._data = data;
      this.setHasValue();

      if (!validate) {
        this.setErrors([]);
      } else {
        this.validate();
      }

      this.refreshDataKeys(focusedId);
      this.controlParams.onChange?.(data);
    }
  };

  getValue = (): T | undefined => this._data;

  private getKey = (): string => getId();
  private refreshDataKeys = (focusedId?: string): void => {
    this.components.ids
      .filter((f) => !focusedId || f !== focusedId)
      .forEach((f) => {
        this.components.setKey(f, this.getKey());
      });
  };

  getValidators = (): IControlValidator<T>[] => this.controlValidators;

  validate = (): IValidationErrors[] => {
    let errors = this.errors.concat([]);
    errors.splice(0, errors.length);
    const validators = this.getValidators().concat([]);
    if (!validators.some((f) => f.code === 'required') && this.state.isRequired) {
      validators.unshift({
        code: 'required',
        errorMesage: 'Поле должно быть заполнено',
        func: () =>
          !(
            (typeof this._data === 'string' && this._data === '') ||
            this._data === undefined ||
            (this._data instanceof Array && this._data.length === 0)
          )
      });
    }
    validators.forEach((f) => {
      if (!f.func(this, this._data)) {
        errors.push({
          code: f.code,
          errorMesage: f.errorMesage
        });
      }
    });

    errors = errors.concat(this._validateStores());
    this.setErrors(errors);

    this.controlParams.onValidate?.(errors);

    return errors;
  };
}
