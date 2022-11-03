import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({
  musicName,
}) {
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
    </div>
  );
}

MusicCard.propTypes = {
  musicName: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
