import React, { useRef } from 'react';
import Header from '../components/Header';

function Search() {
  const inputRef = useRef();
  const buttonRef = useRef();

  const handleSearch = () => {
    const { value } = inputRef.current;
    if (value.length > 1) {
      buttonRef.current.disabled = false;
    } else {
      buttonRef.current.disabled = true;
    }
  };

  return (
    <div data-testid="page-search">
      <Header />
      <input
        onChange={ handleSearch }
        ref={ inputRef }
        data-testid="search-artist-input"
        type="text"
      />
      <button
        ref={ buttonRef }
        disabled
        type="button"
        data-testid="search-artist-button"
      >
        Pesquisar

      </button>
    </div>
  );
}

export default Search;
