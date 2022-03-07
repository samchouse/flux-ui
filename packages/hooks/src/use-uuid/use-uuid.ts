import { useState } from 'react';

import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect';
import { randomId } from '../utils';

export const useUuid = (staticId?: string) => {
  const [uuid, setUuid] = useState('');

  useIsomorphicEffect(() => {
    setUuid(randomId());
  }, []);

  return staticId ?? uuid;
};
