import React from 'react';
import PropTypes from 'prop-types';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

class Perfil extends React.Component {
  render() {
    const { email } = this.props;
    const pageTitle = 'Perfil';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        <div>
          <p data-testid="profile-email">{email}</p>

          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>

          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>

          <button
            type="button"
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}

Perfil.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Perfil;
