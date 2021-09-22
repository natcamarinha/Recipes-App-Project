import React from 'react';
import Header from '../components/Header';

class Bebidas extends React.Component {
  render() {
    const pageTitle = 'Bebidas';
    return (
      <div>
        <Header value={ pageTitle } />
        Bebidas
      </div>
    );
  }
}

export default Bebidas;
