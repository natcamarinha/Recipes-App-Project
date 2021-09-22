import React from 'react';
import { Link } from 'react-router-dom';

export default class ReceitasProgresso extends React.Component {
  render() {
    return (
      <div>
        <Link to="/receitas-feitas">
          <button
            type="button"
            disabled={ disabled }
          >
            Finalizar receita
          </button>
        </Link>
      </div>
    );
  }
}
