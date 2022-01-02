import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';
import './Perfil.css';
import perfilIcon from '../images/perfilIcon.svg';

export default function Perfil({ history }) {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  function handleClick() {
    localStorage.clear();
    history.push('/');
  }

  const pageTitle = 'Perfil';
  return (
    <div className="masterP">
      <SearchHeader value={ pageTitle } />
      <div className="Perfil">
        <img
          className="perfilIcon"
          src={ perfilIcon }
          alt="perfilIcon"
          width="150px"
        />
        <p className="emailPerfil" data-testid="profile-email">{ email }</p>
      </div>

      <div className="btnAll">
        <button
          className="btnPerfil"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/receitas-feitas') }
        >
          Receitas Feitas
        </button>

        <button
          className="btnPerfil"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/receitas-favoritas') }
        >
          Receitas Favoritas
        </button>

        <button
          className="btnPerfil"
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
