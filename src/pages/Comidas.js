import React from 'react';
import Header from '../components/Header';

class Comidas extends React.Component {
  render() {
    const pageTitle = 'Comidas';
    return (
      <div>
        <Header value={ pageTitle } />
        Comidas
      </div>
    );
  }
}

export default Comidas;
