import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';
import Explorar from './pages/Explorar';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import store from './store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={ store }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/perfil" component={ Perfil } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
