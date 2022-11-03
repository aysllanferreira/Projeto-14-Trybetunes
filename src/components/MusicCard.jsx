import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

function MusicCard({
  musicName,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const addFavorite = async () => {
    setIsLoading(true);
    await addSong(musicName);
    setIsLoading(false);
  };
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
          onClick={ addFavorite }
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
};

export default MusicCard;
