import React from 'react';
import Header from '../components/Header';

class ExplorarLocalDeOrigem extends React.Component {
  render() {
    const pageTitle = 'Explorar Origem';
    return (
      <div>
        <Header value={ pageTitle } />
        Explorar Origem
      </div>
    );
  }
}

export default ExplorarLocalDeOrigem;
