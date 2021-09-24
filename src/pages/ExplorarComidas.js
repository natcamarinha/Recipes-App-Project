import React from 'react';
import SearchHeader from '../components/SearchHeader';

class ExplorarComidas extends React.Component {
  render() {
    const pageTitle = 'Explorar Comidas';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        Explorar Comidas
      </div>
    );
  }
}

export default ExplorarComidas;
