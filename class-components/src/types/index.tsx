import type { ReactNode } from 'react';

export interface ItemDisplay {
  name: string;
  description: string;
}

export interface Mappable<T> {
  fromJson(data: unknown): T;
}

export interface ApplicationContext {
  items: ItemDisplay[];
  isLoading: boolean;
  error: string | null;
  search: string;
  testErrorThrow: boolean;
}

export interface PokemonListResponse {
  results: { name: string; url: string }[];
}

export interface PokemonSingleResponse {
  name: string;
  base_experience: number;
}

export interface SearchProperties {
  onSearch: (term: string) => void;
}

export interface SearchState {
  value: string;
}

export interface ErrorProperties {
  children: ReactNode;
}

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
}

export interface ResultSectionProperties {
  items: ItemDisplay[];
  isLoading: boolean;
  error: string | null | undefined;
  shouldThrow: boolean;
  onItemClick: (name: string) => void;
}

export interface PaginationProperties{
  current: number;
  total: number;
  size: number;
  onPageChange: (page: number) => void;
}

export interface PokemonDetails {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
}

export interface ItemDisplayProperties {
  item: ItemDisplay;
  onClick?: (name: string) => void;
}
