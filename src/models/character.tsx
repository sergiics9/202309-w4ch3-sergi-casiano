export interface Character {
  name: string;
  family: string;
  age: number;
  isAlive: boolean;
  personalQuote: string;
  category: King | Fighter | Adviser | Squire;
}

export interface King extends Character {
  reignYears: number;
}
export interface Fighter extends Character {
  weapon: string;
  skillLevel: number;
}

export interface Adviser extends Character {
  adviseTo: Fighter;
}

export interface Squire extends Character {
  serveLevel: number;
  servesTo: Fighter;
}
