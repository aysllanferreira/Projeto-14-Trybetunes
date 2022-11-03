import React, { useState } from 'react';
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
      <h1>ola</h1>
      {isLoading ? <p data-testid="header-user-name">{user.name}</p> : <Loading />}
    </header>
  );
}

export default Header;
