import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

class ExplorarBebidas extends React.Component {
  render() {
    const pageTitle = 'Explorar Bebidas';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarBebidas;
