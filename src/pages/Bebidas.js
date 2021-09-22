import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class Bebidas extends React.Component {
  render() {
    const pageTitle = 'Bebidas';
    return (
      <div>
        <Header value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default Bebidas;
