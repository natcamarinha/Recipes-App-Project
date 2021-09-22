import React from 'react';
import BarraDeBusca from '../components/BarraDeBusca';

class Perfil extends React.Component {
  render() {
    const pageTitle = 'Perfil';
    return (
      <div>
        <BarraDeBusca value={ pageTitle } />
        Perfil
      </div>
    );
  }
}

export default Perfil;
