import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../utils/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_TEST_ID = 'login-submit-btn';
const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '1234567';

describe('1 - Crie uma página inicial de login', () => {
  test('A rota para esta página deve ser \'/\'', () => {
    const { history } = renderWithRouterAndRedux(<Login />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Entrar\'', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Crie campos para interação com os inputs', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    expect(email.value).toBe(VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(senha.value).toBe(VALID_PASSWORD);
  });
});

describe('2 - Realize as verificações nos campos de email, senha e botão', () => {
  test('O botão está desabilitado ao entrar na página', () => {
    renderWithRouterAndRedux(<Login />);

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeDisabled();
  });

  test('O botão está desabilitado quando um email inválido é digitado', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, 'email');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();

    userEvent.type(email, 'alguem@email.');
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeDisabled();
  });

  test('O botão está desabilitado quando uma senha inválida é digitada', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, '23456');
    expect(button).toBeDisabled();
  });

  test('O botão está habilitado quando um email e uma senha válidos são passados', () => {
    renderWithRouterAndRedux(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(button).toBeEnabled();
  });
});

describe('3 - Verifica se muda rota e salva no localStorage após click do botão', () => {
  test('A rota deve ser mudada para \'/comidas\' e infos salvas no localStorage', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    userEvent.click(button);

    history.push('/comidas');
    expect(history.location.pathname).toBe('/comidas');

    const mealsToken = localStorage.getItem('mealsToken');
    const cocktailsToken = localStorage.getItem('cocktailsToken');
    const user = localStorage.getItem('user');

    expect(mealsToken).toBe('1');
    expect(cocktailsToken).toBe('1');
    expect(user).toBe('{"email":"alguem@email.com"}');
  });
});
