import { Fighter } from '../models/character';
import { King } from '../models/character';
import { Squire } from '../models/character';
import { Adviser } from '../models/character';

export type AnyCharacter = King | Fighter | Adviser | Squire;

export class ApiRepo {
  apiUrl = 'http://localhost:3000/characters';

  async getCharacters(): Promise<AnyCharacter[]> {
    const response = await fetch(this.apiUrl);
    if (!response.ok)
      throw new Error(response.status + ' ' + response.statusText);
    return response.json();
  }
}
