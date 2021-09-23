import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './Header.css';

function Header({ value }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  function ifShowInput() {
    if (showInput === false) {
      return setShowInput(true);
    }
    return setShowInput(false);
  }

  function searchInput() {
    if (showInput) {
      return (
        <input type="text" data-testid="search-input" />
      );
    }
  }

  return (
    <header className="header">
      <button
        type="button"
        onClick={ () => history.push('/perfil') }
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="user"
        />
      </button>
      <h1 data-testid="page-title">{ value }</h1>
      <button
        type="button"
        onClick={ ifShowInput }
      >
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search"
        />
      </button>
      { searchInput() }
    </header>
  );
}

Header.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Header;
