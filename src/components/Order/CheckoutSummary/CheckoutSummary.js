import React from 'react';
import './CheckoutSummary.css'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = props => {
    return (
        <div className="CheckoutSummary">
            <h1>we Hope it tates well..</h1>
            <div style={{ width: '100%',margin:'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Button btnType="Danger"
                clicked={props.onCheckoutCancelled}
            >CANCEL</Button>
            <Button btnType="Success" 
            clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;