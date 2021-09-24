import React from 'react';
import SearchHeader from '../components/SearchHeader';

class Perfil extends React.Component {
  render() {
    const pageTitle = 'Perfil';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        Perfil
      </div>
    );
  }
}

export default Perfil;
