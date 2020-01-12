import * as actionTypes from "../actions/actionTypes";
import { updateObject } from '../../shared/utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.2,
  bacon: 0.7,
  meat: 1.0
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1
  };
  const updatedIngredients = updateObject(
    state.ingredients,
    updatedIngredient
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
    building: true
  };
  return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] - 1
  };
  const updatedIngredients = updateObject(
    state.ingredients,
    updatedIngredient
  );
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
    building: true
  };
  return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false
  })
}

const fetchIngredientError = (state) => {
  return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD: return addIngredient(state, action)
    case actionTypes.REMOVE: return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
    case actionTypes.FETCH_INGREDIENTS_ERROR: return fetchIngredientError(state);
    default: return state;
  }
};

export default reducer;
