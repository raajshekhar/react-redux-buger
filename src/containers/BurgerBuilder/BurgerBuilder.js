import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axiosInstance from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class BurgerBuilder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            purchasing: false
        }
    }

    componentDidMount(){
        // console.log('BurgerBuilder: ',this.props)
        this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el
        },0);
        return sum
        // this.setState({
        //     purchasable: sum > 0
        // })
    }

  /*  addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount  = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAdition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPirce = oldPrice + priceAdition;
        this.setState({
                totalPrice: newPirce,
                ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(!oldCount) return;
        const updatedCount  = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPirce = oldPrice - priceDeduction;
        this.setState({
                totalPrice: newPirce,
                ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }
*/
    purchaseHandler = () =>{
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () =>{
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () =>{
      this.props.onInitPurchase()
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }   
        // const queryString = queryParams.join('&');
        // queryParams.push('price='+this.state.totalPrice)
        this.props.history.push('/checkout')
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't loaded</p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients={ this.props.ings } />
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = { disabledInfo }
                        price = {this.props.price}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                    />
                    </Aux>
            );
            orderSummary =  <OrderSummary 
        price = {this.props.price}
        purchaseCanceled = {this.purchaseCancelHandler}
        purchaseContinued = {this.purchaseContinueHandler}
        ingredients={this.props.ings} />
        }

                 
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        
        return (
            <Aux>
                
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                   { orderSummary }
                </Modal>
                { burger }
            </Aux>
        );  
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axiosInstance));