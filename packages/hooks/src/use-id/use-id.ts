import { useId as reactUseId } from 'react';

export const useId = (staticId?: string) => {
  const id = reactUseId();
  return staticId ?? id;
};
