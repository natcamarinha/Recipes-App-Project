import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

class ExplorarComidas extends React.Component {
  render() {
    const pageTitle = 'Explorar Comidas';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarComidas;
