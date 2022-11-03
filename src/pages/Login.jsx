import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

function Login() {
  const login = useRef();
  const buttons = useRef();

  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClick = async () => {
    const getUser = { name: login.current.value };
    setLoading(true);
    await createUser(getUser);
    setLoading(false);
    setRedirect(true);
  };

  const handleLogin = () => {
    const charsLogin = login.current.value.length;
    if (charsLogin > 2) {
      buttons.current.disabled = false;
      buttons.current.onclick = handleClick;
    } else buttons.current.disabled = true;
  };

  return (
    <div data-testid="page-login">
      {loading && <Loading />}
      {redirect && <Redirect to="/search" />}
      <input
        onChange={ handleLogin }
        ref={ login }
        type="text"
        data-testid="login-name-input"
      />
      <button
        ref={ buttons }
        data-testid="login-submit-button"
        type="button"
        disabled
      >
        Entrar

      </button>
    </div>
  );
}

export default Login;
