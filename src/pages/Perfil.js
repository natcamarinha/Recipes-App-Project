import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

class Perfil extends React.Component {
  render() {
    const pageTitle = 'Perfil';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default Perfil;
