import * as React from 'react';
import { Component } from 'react';
import type { SearchProperties, SearchState } from '../../types';
import './Search.scss';

class Search extends Component<SearchProperties, SearchState> {
  private readonly STORAGE: string = 'inMemory';
  state: SearchState = {
    value: localStorage.getItem(this.STORAGE) ?? '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleSearch = () => {
    const trimmed = this.state.value.trim();
    localStorage.setItem(this.STORAGE, trimmed);
    this.props.onSearch(trimmed);
  };

  render() {
    return (
      <div className="search">
        <input
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={(e) => e.key === 'Enter' && this.handleSearch()}
          placeholder="placehodler"
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
