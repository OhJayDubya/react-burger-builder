import * as actionTypes from "./actionTypes";

export const add = ingredient => {
  return {
    type: actionTypes.ADD,
    ingredient
  };
};
export const remove = ingredient => {
  return {
    type: actionTypes.REMOVE,
    ingredient
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

export const fetchIngredientsError = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_ERROR
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS
  };
};
