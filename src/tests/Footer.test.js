import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../renderWithRouter';
import Perfil from '../pages/Perfil';

const FOOTER = 'footer';
const DRINK_LINK = 'drinks-bottom-btn';
const EXPLORE_LINK = 'explore-bottom-btn';
const MEAL_LINK = 'food-bottom-btn';

describe('1 - Crie o footer', () => {
  test('Verifica se o footer foi renderizado com os links para redirecionar', () => {
    renderWithRouterAndRedux(<Perfil />);

    const footer = screen.getByTestId(FOOTER);
    const drinks = screen.getByTestId(DRINK_LINK);
    const explore = screen.getByTestId(EXPLORE_LINK);
    const meals = screen.getByTestId(MEAL_LINK);

    expect(footer).toBeInTheDocument();
    expect(drinks).toBeInTheDocument();
    expect(explore).toBeInTheDocument();
    expect(meals).toBeInTheDocument();
  });

  test('Verifica se os ícones têm a imagem correta', () => {
    renderWithRouterAndRedux(<Perfil />);

    const drinks = screen.getByTestId(DRINK_LINK);
    const explore = screen.getByTestId(EXPLORE_LINK);
    const meals = screen.getByTestId(MEAL_LINK);

    expect(drinks).toHaveAttribute('src', 'drinkIcon.svg');
    expect(explore).toHaveAttribute('src', 'exploreIcon.svg');
    expect(meals).toHaveAttribute('src', 'mealIcon.svg');
  });
});

describe('2 - Verifica se os ícones direcionam para as páginas certas', () => {
  test('Verifica se o ícone drink direciona para a página certa', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const drinks = screen.getByTestId(DRINK_LINK);

    userEvent.click(drinks);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  test('Verifica se o ícone explore direciona para a página certa', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const explore = screen.getByTestId(EXPLORE_LINK);

    userEvent.click(explore);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });

  test('Verifica se o ícone meals direciona para a página certa', () => {
    const { history } = renderWithRouterAndRedux(<Perfil />);

    const meals = screen.getByTestId(MEAL_LINK);

    userEvent.click(meals);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
