import React from 'react';
import SearchHeader from '../components/SearchHeader';

class Explorar extends React.Component {
  render() {
    const pageTitle = 'Explorar';
    return (
      <div>
        <SearchHeader value={ pageTitle } />
        Explorar
      </div>
    );
  }
}

export default Explorar;
