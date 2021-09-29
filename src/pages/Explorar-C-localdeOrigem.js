import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import { ApiMealsFirstLetter } from '../services/MealApi';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export default function ExplorarLocalDeOrigem() {
  const [firstFood, setFirstFood] = useState([]);
  const [countries, setCountries] = useState([]);
  const pageTitle = 'Explorar Origem';
  const limits = 12;
  const { recipesDb, setRecipesDb } = useContext(RecipesContext);

  useEffect(() => {
    const response = async () => {
      const data = await ApiMealsFirstLetter('c');
      return setFirstFood(data);
    };
    response();
  }, []);

  useEffect(() => {
    const response = async () => {
      const data = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then((res) => res.json());
      return setCountries(data.meals);
    };
    response();
  }, []);

  async function getMealFromLocal(param) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${param}`);
    const data = await response.json();

    setRecipesDb([]);
    return setRecipesDb(data.meals);
  }

  function renderSelect() {
    return (
      <label htmlFor="card">
        Escolha o Local:
        <select
          onChange={ ({ target }) => {
            if (target.value === 'All') {
              setRecipesDb(firstFood);
            }
            getMealFromLocal(target.value);
          } }
          data-testid="explore-by-area-dropdown"
          name="countries"
          id="card"
        >
          <option
            key={ 0 }
            data-testid="All-option"
            value="All"
          >
            All
          </option>
          {
            countries.map((countrie, index) => (
              <option
                key={ index + 1 }
                data-testid={ `${countrie.strArea}-option` }
                value={ countrie.strArea }
              >
                { countrie.strArea }
              </option>
            ))
          }
        </select>
      </label>
    );
  }

  function handleMeals() {
    if (recipesDb.length === 0) {
      return (
        <div className="card-container">
          {
            firstFood.map((meal, index) => (
              (index < limits) && (
                <Link to={ `/comidas/${meal.idMeal}` } key={ index }>
                  <div className="card-style">
                    <div className="card-img" data-testid={ `${index}-recipe-card` }>
                      <img
                        src={ meal.strMealThumb }
                        data-testid={ `${index}-card-img` }
                        alt={ meal.strMeal }
                        width="150px"
                      />
                    </div>
                    <div className="card-title">
                      <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
                    </div>
                  </div>
                </Link>
              )
            ))
          }
        </div>
      );
    } return (
      <div className="card-container">
        {
          recipesDb.map((meal, index) => (
            (index < limits) && (
              <Link to={ `/comidas/${meal.idMeal}` } key={ index }>
                <div className="card-style">
                  <div className="card-img" data-testid={ `${index}-recipe-card` }>
                    <img
                      src={ meal.strMealThumb }
                      data-testid={ `${index}-card-img` }
                      alt={ meal.strMeal }
                      width="150px"
                    />
                  </div>
                  <div className="card-title">
                    <span data-testid={ `${index}-card-name` }>{ meal.strMeal }</span>
                  </div>
                </div>
              </Link>
            )
          ))
        }
      </div>
    );
  }

  return (
    <div>
      <Header value={ pageTitle } />
      {
        renderSelect()
      }
      {
        handleMeals()
      }
      <Footer />
    </div>
  );
}
