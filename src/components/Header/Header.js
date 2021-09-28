import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './Header.css';

function Header({ value }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  useEffect(() => () => {
    setShowInput(false);
  }, [setShowInput]);

  function ifShowInput() {
    if (showInput === false) {
      return setShowInput(true);
    }
    return setShowInput(false);
  }

  function searchInput() {
    if (showInput) {
      return (
        <SearchBar />
      );
    }
  }

  return (
    <div>
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
      </header>
      { searchInput() }
    </div>
  );
}

Header.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Header;
