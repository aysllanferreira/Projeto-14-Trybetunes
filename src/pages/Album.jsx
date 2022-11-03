import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState([]);
  const [favSongs, setFavSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMusics(id);
      setAlbum(data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      const data = await getFavoriteSongs();
      setFavSongs(data);
    };
    fetchFavoriteSongs();
  }, []);

  const getFavorite = (trackIds) => favSongs.some(({ trackId }) => trackId === trackIds);

  return (
    <div data-testid="page-album">
      <Header />
      {album.length === 0 ? <Loading /> : (
        <div>
          <h1>Álbum</h1>
          <br />
          <img
            src={ album[0].artworkUrl100 }
            alt={ album[0].title }
          />
          <h2 data-testid="artist-name">{album[0].artistName}</h2>
          <h3 data-testid="album-name">{album[0].collectionName}</h3>
          <ul>
            {album.slice(1).map((music) => (
              <li key={ Math.random() }>
                <MusicCard
                  musicName={ music }
                  favorite={ getFavorite(music.trackId) }
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Album;
