import * as actionTypes from '../actions/actionsTypes'
import {updateObject} from '../utility'
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]    
            }
        return updateObject(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
        const RupdatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
        const RupdatedIngredients = updateObject(state.ingredients,RupdatedIngredient);
        const RupdatedState = {
            ingredients: RupdatedIngredients,
            totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]    
        }
    return updateObject(state, RupdatedState)
        case actionTypes.SET_INGREDIENTS:
        return updateObject(state, {
            ...state,
            ingredients: {
                ...action.ingredients
            },
            totalPrice: 4,
            error: false
        })
        
        case actionTypes.FETCH_INGREDIENTS_FAIL:
        return updateObject(state, { error: true })
        
        default: // this will reach if none of the cases apply
        return state
    }
}

export default reducer;