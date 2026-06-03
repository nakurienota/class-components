import type { ItemDisplay } from '../../types';

export interface PokemonState {
  searchTerm: string;
  currentPage: number;
  testErrorThrow: boolean;
  selectedItems: ItemDisplay[]
}