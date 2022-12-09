import type { MutableRefObject } from 'react';
import { v4 } from 'uuid';
import { useEffect, useMemo, useRef } from 'react';
import type { ControlStore } from '../components/control.store';
import type { FormStore } from '../components/form/form.store';

export type TControllerRef<T> = MutableRefObject<T | undefined>;
export type Size = 's' | 'm' | 'l';
export const getId = (): string => {
  let uuid = v4();
  const possible = 'abcdef';
  uuid = uuid.replace(uuid.charAt(0), possible.charAt(Math.floor(Math.random() * possible.length)));
  return uuid;
};

export const setupFormStores = (stores: unknown[], form: FormStore): void => {
  stores.forEach((store) => form.addStore(store as ControlStore<unknown>));
};

export const useNewStore = <T, P>(Store: new (args: P) => T, args: P = {} as P, dependencies: [] = []): T =>
  useMemo(() => new Store(args), dependencies);

export const useGetController = <T>(store: { controller: T }): TControllerRef<T> => {
  const controller = useRef<T>();
  controller.current = store.controller;
  return controller;
};

export const setController = <T>(store: { controller: T }, controllerRef: TControllerRef<T>): T => {
  const { controller } = store;
  controllerRef.current = controller;
  return controller;
};

type WithApiRequestAbortDestructor = () => void;

export const useEffectWithApiRequestAbort = <T>(
  callback: (requestId: string, dependencies: T[]) => void | WithApiRequestAbortDestructor,
  dependencies: T[],
  returnCallback?: () => void
): void => {
  const requestId = useMemo(() => getId(), []);
  useEffect(() => {
    callback(requestId, dependencies);
    return () => {
      returnCallback?.();
      //   ApiProxy.abort(requestId);
    };
  }, dependencies);
};

export const useRequestIdAbort = (): string => {
  const requestId = useMemo(() => getId(), []);
  useEffect(() => {
    return () => {
      //   ApiProxy.abort(requestId);
    };
  }, []);
  return requestId;
};
