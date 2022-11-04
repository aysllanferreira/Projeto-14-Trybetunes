import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [removeSound, setRemoveSound] = useState(false);

  const getFavorite = async () => {
    setIsLoading(true);
    const favorite = await getFavoriteSongs();
    setFavoriteSongs(favorite);
    setIsLoading(false);
  };

  useEffect(() => {
    getFavorite();
  }, [removeSound]);

  const getFavorites = (trackIds) => favoriteSongs
    .some(({ trackId }) => trackId === trackIds);

  return (
    <div data-testid="page-favorites">
      <Header />
      <ul>
        {isLoading ? <Loading /> : favoriteSongs.map((song) => (

          <li key={ Math.random() }>
            <MusicCard
              musicName={ song }
              favorite={ getFavorites(song.trackId) }
              removeSound={ setRemoveSound }
            />
          </li>

        ))}
      </ul>
    </div>
  );
}

export default Favorites;
