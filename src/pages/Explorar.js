import React from 'react';
import SearchHeader from '../components/Header/SearchHeader';
import Footer from '../components/Footer/Footer';

class Explorar extends React.Component {
  render() {
    const pageTitle = 'Explorar';
    return (
      <div>

        <SearchHeader value={ pageTitle } />
        <Footer />
      </div>
    );
  }
}

export default Explorar;
