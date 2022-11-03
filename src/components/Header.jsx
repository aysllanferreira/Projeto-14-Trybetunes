import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const callUser = async () => {
    const users = await getUser();
    setIsLoading(true);
    setUser(users);
  };

  if (!isLoading) callUser();

  return (
    <header data-testid="header-component">
      {isLoading ? <p data-testid="header-user-name">{user.name}</p> : <Loading />}
      {' '}
      <br />
      <nav>
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
      </nav>
    </header>
  );
}

export default Header;
