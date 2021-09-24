import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class ExplorarLocalDeOrigem extends React.Component {
  render() {
    const pageTitle = 'Explorar Origem';
    return (
      <div>
        <Header value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default ExplorarLocalDeOrigem;
