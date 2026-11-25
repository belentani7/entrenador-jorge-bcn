import { useRef } from "react";

type AnyFunction = (...args: any[]) => any;

/**
 * usePersistFn instead of useCallback to reduce cognitive load.
 * The argument list is intentionally `any[]`: React event handlers are
 * contravariant, so `(...args: unknown[]) => any` rejects every typed handler.
 */
export function usePersistFn<T extends AnyFunction>(fn: T) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const persistFn = useRef<T>(null);
  if (!persistFn.current) {
    persistFn.current = function (this: unknown, ...args) {
      return fnRef.current!.apply(this, args);
    } as T;
  }

  return persistFn.current!;
}
