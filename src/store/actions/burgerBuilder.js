import * as actionTypes from './actionsTypes'
import axiosInstance from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

// Asynchronous code example
export const initIngredients = () => {
    return (dispatch) => {
              axiosInstance.get('/ingredients.json')
        .then((response) => {
           dispatch(setIngredients(response.data))
        })
        .catch((error)=>{
           dispatch(fetchIngredientsFailed())
        })
    }
}