import { useCallback, useState } from 'react';

import { useEventListener } from './useEventListener';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

interface ISize {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [(node: T | null) => void, ISize] {
  const [ref, setRef] = useState<T | null>(null);
  const [size, setSize] = useState<ISize>({
    width: 0,
    height: 0
  });

  const handleSize = useCallback(() => {
    setSize({
      width: ref?.getBoundingClientRect().width || 0,
      height: ref?.getBoundingClientRect().height || 0
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  useEventListener('resize', handleSize);

  useIsomorphicLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref?.offsetHeight, ref?.offsetWidth]);

  return [setRef, size];
}
