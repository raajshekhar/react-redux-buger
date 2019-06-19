import * as actionTypes from './actionsTypes';
import axiosInstance from '../../axios-orders';

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axiosInstance.post('/orders.json', orderData)
            .then((response) => {
              dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch((error) => {
              dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error
    }
}

export const fetchOrdersStart = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
        error
    }
}

export const fetchOrders = (error) => {
   return dispatch => {
    axiosInstance.get('orders.json')
    .then((response)=>{
        const fetchedOrders = [];
        for(let key in response.data){
            fetchedOrders.push({
                ...response.data[key],
                id: key
            })
        }
        dispatch(fetchOrdersSuccess(fetchedOrders))
    }).catch((error)=>{
        dispatch(fetchOrdersFail(error))
    })
   }
}