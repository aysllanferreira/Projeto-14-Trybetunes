import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

function ProfileEdit() {
  const history = useHistory();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [button, setButton] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await getUser();
      setUser(response);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await updateUser(user);
    setLoading(false);
    history.push('/profile');
  };

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleButton = () => {
    const { name, email, description, image } = user;
    const array = [name, email, description, image];
    const getFilled = array.some((item) => item === '');
    if (getFilled) setButton(true);
    else setButton(false);
  };

  useEffect(() => {
    handleButton();
  }, [user]);

  return (
    <div data-testid="page-profile-edit">
      <Header />
      {loading ? <Loading /> : (
        <div>
          <input
            onChange={ handleChanges }
            type="text"
            data-testid="edit-input-name"
            id="name"
            name="name"
            value={ user.name }
          />
          <input
            onChange={ handleChanges }
            type="text"
            data-testid="edit-input-email"
            id="email"
            name="email"
            value={ user.email }
          />
          <input
            onChange={ handleChanges }
            type="text"
            data-testid="edit-input-description"
            id="description"
            name="description"
            value={ user.description }
          />
          <input
            onChange={ handleChanges }
            type="text"
            data-testid="edit-input-image"
            id="image"
            name="image"
            value={ user.image }
          />
          <button
            type="button"
            data-testid="edit-button-save"
            onClick={ handleSubmit }
            disabled={ button }
          >
            Salvar

          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
