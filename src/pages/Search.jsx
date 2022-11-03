import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

function Search() {
  const inputRef = useRef();
  const buttonRef = useRef();

  const [onScreen, setOnScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState('');
  const [results, setResults] = useState([]);
  const [getResults, setGetResults] = useState(false);
  const [status, setStatus] = useState(false);

  const handleClick = async () => {
    setArtist(inputRef.current.value);
    inputRef.current.value = '';
    setIsLoading(true);
    setGetResults(true);
    setIsLoading(false);
    setOnScreen(true);
    setStatus(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchAlbumsAPI(artist);
      setResults(data);
    };
    fetchData();
  }, [results, artist, getResults]);

  const handleSearch = () => {
    const { value } = inputRef.current;
    if (value.length > 1) {
      buttonRef.current.disabled = false;
      buttonRef.current.onclick = handleClick;
    } else {
      buttonRef.current.disabled = true;
    }
  };

  const handleOptions = () => {
    if (!status) return null;
    if (results.length === 0 && status) return <h2>Nenhum álbum foi encontrado</h2>;
    if (results.length > 0 && status) {
      return (
        <h2 data-testid="artist-name">
          {`Resultado de álbuns de: ${artist}`}
        </h2>
      );
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
      {onScreen && handleOptions()}
      {isLoading ? <Loading /> : results.map((album) => (
        <div key={ album.collectionId }>
          <Link
            to={ `/album/${album.collectionId}` }
            data-testid={ `link-to-album-${album.collectionId}` }
          >
            Ir ao album
          </Link>
          <img src={ album.artworkUrl100 } alt={ album.title } />
          <h2>{album.artistName}</h2>
          <h3>{album.collectionName}</h3>
        </div>
      ))}

    </div>
  );
}

export default Search;
