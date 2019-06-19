import React, { Component }  from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/index'

class Checkout extends Component{

    componentWillMount(){
        //this.props.onInitPurchase()
        // const query = new URLSearchParams(this.props.location.search);
        // const ingredients = {}; 
        // let price= 0;
        // for(let param of query.entries()){
        //     if(param[0] == 'price') price = +param[1]
        //     else ingredients[param[0]] = +param[1]
            
        // }  
        // this.setState({
        //     ingredients
        // })
    }

    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('checkout/contact-data');
    }

    render(){
        let summary = <Redirect to= '/' />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ?  <Redirect to= '/' /> : null;
            summary = (<div>
                {purchasedRedirect}
                <CheckoutSummary
                onCheckoutCancelled = {this.onCheckoutCancelledHandler}
                onCheckoutContinued = {this.onCheckoutContinuedHandler}
                ingredients={this.props.ings} />
                <Route path={this.props.match.path + '/contact-data' } 
                    component= {ContactData}
                //   render={(props)=>(
                //       <ContactData ingredients={this.state.ingredients}
                //         {...props}
                //       price={this.state.price} />
                //   )}
                />
            </div>  )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);