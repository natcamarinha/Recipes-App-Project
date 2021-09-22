import React from 'react';
import BarraDeBusca from '../components/BarraDeBusca';

class Explorar extends React.Component {
  render() {
    const pageTitle = 'Explorar';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        Explorar
      </div>
    );
  }
}

export default Explorar;
