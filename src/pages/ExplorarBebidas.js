import React from 'react';
import SearchHeader from '../components/SearchHeader';

class ExplorarBebidas extends React.Component {
  render() {
    const pageTitle = 'Explorar Bebidas';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        Explorar Bebidas
      </div>
    );
  }
}

export default ExplorarBebidas;
