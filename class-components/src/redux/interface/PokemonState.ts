import type { ItemDisplay } from '../../types';

export interface PokemonState {
  items: ItemDisplay[];
  total: number;
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  testErrorThrow: boolean;
}