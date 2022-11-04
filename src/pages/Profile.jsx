import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

function Profile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const fetchUser = async () => {
    setLoading(true);
    const response = await getUser();
    setUser(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div data-testid="page-profile">
      <Header />
      {loading ? <Loading /> : (
        <div>
          <img
            data-testid="profile-image"
            src={ user.image }
            alt={ user.name }
          />
          <p data-testid="profile-name">{ user.name }</p>
          <p data-testid="profile-email">{ user.email }</p>
          <p>{user.description}</p>
          <button
            type="button"
            onClick={ () => history.push('/profile/edit') }
          >
            Editar perfil
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
