import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleToken() {
    const { email } = this.state;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
  }

  handleClick(event) {
    event.preventDefault();
    const { history } = this.props;
    history.push('/comidas');
    this.handleToken();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { email, password } = this.state;
    const minPasswordLength = 6;

    const emailIsValid = () => {
      const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      // source: https://www.w3resource.com/javascript/form/email-validation.php
      const validEmail = validationRegex.test(email);
      return validEmail;
    };

    const passwordIsValid = password.length >= minPasswordLength;

    return (
      <form action="">
        <div>
          <label htmlFor="email">
            <input
              id="email"
              data-testid="email-input"
              name="email"
              type="text"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <input
              id="password"
              data-testid="password-input"
              name="password"
              type="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button
          data-testid="login-submit-btn"
          id="login-submit-btn"
          onClick={ this.handleClick }
          type="submit"
          disabled={ !(emailIsValid() && passwordIsValid) }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
