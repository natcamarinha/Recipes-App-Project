import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
  } = {},
) => {
  const history = createMemoryHistory();
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return ({
    ...render(
      <Router
        history={ history }
      >
        <Provider store={ store }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
    store,
  });
};

export default renderWithRouterAndRedux;

// estrutura criada com ajuda do conteúdo do bolco 16.5
