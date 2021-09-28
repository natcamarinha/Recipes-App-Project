import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';

function SearchHeader({ value }) {
  const history = useHistory();
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
      <p className="p"> </p>
    </header>
  );
}

SearchHeader.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SearchHeader;
