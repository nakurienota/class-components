import * as React from 'react';
import { useState } from 'react';
import type { SearchProperties } from '../../types';
import './Search.scss';

function Search({ onSearch }: Readonly<SearchProperties>) {
  const STORAGE: string = 'inMemory';
  const [value, setValue] = useState<string>(() => localStorage.getItem(STORAGE) ?? '',);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmed = value.trim();
    localStorage.setItem(STORAGE, trimmed);
    onSearch(trimmed);
  };

  return (
    <div className="search">
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="placehodler"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
