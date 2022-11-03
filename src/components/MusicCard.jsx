import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

function MusicCard({
  musicName,
  favorite,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);

  useEffect(() => {
    setIsFavorite(favorite);
  }, [favorite]);

  const addFavorite = async (param, func) => {
    setIsLoading(true);
    await func(musicName);
    setIsFavorite(param);
    setIsLoading(false);
  };

  const handleFavorite = () => (
    !isFavorite ? addFavorite(true, addSong) : addFavorite(false, removeSong)
  );

  return (
    <div>
      <p>{musicName.trackName}</p>
      <audio data-testid="audio-component" src={ musicName.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>
      <label htmlFor="favMusic">
        Favorita
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${musicName.trackId}` }
          id="favMusic"
          onChange={ handleFavorite }
          checked={ isFavorite }
        />
      </label>
      {isLoading && <p>Carregando...</p>}
    </div>
  );
}

MusicCard.propTypes = {
  musicName: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
