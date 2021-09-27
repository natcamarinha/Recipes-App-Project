import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

export default function Perfil({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem('user')).email);
  }, []);

  function handleClick() {
    localStorage.clear();
    history.push('/');
  }

  const pageTitle = 'Perfil';
  return (
    <div>
      <SearchHeader value={ pageTitle } />
      <div>
        <p data-testid="profile-email">{ email }</p>
      </div>

      <div>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}

Perfil.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
