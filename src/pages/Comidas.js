import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

class Comidas extends React.Component {
  render() {
    const pageTitle = 'Comidas';
    return (
      <div>
        <Header value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default Comidas;
