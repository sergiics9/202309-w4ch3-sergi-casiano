import { useCallback, useMemo, useState } from 'react';
import { ApiRepo } from '../services/api.repo';
import { Fighter } from '../models/character';
import { King } from '../models/character';
import { Squire } from '../models/character';
import { Adviser } from '../models/character';

export type AnyCharacter = King | Fighter | Adviser | Squire;

export function useCharacters() {
  const [characters, setCharacters] = useState<AnyCharacter[]>([]);
  const repo = useMemo(() => new ApiRepo(), []);
  const loadCharacters = useCallback(async () => {
    try {
      const loadedCharacters = await repo.getCharacters();

      setCharacters(loadedCharacters);
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [repo]);
  return {
    characters,
    loadCharacters,
  };
}
