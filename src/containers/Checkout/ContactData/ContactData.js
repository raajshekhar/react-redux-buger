import React, { Component } from 'react'
import './ContactData.css'
import { connect } from 'react-redux'
import axiosInstance from '../../../axios-orders'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import WithErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler'
import * as actions from '../../../store/actions/index'
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',  
                elementConfig: {
                    type: "text",
                    placeholder: 'Enter your name'
                },
                value: '',
                validationKey: {
                    required: true,   
                },
                valid: false,
                touched: false
            },
            street:  {
                elementType: 'input',  
                elementConfig: {
                    type: "text",
                    placeholder: 'Enter Street'
                },
                value: '',
                validationKey: {
                    required: true,   
                },
                valid: false,
                touched: false
            },
            zipCode:  {
                elementType: 'input',  
                elementConfig: {
                    type: "text",
                    placeholder: 'Enter Zipcode'
                },
                value: '',
                validationKey: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:  {
                elementType: 'input',  
                elementConfig: {
                    type: "text",
                    placeholder: 'Enter Country'
                },
                value: '',
                validationKey: {
                    required: true,   
                },
                valid: false,
                touched: false
            },
            email:  {
                elementType: 'input',  
                elementConfig: {
                    type: "text",
                    placeholder: 'Enter your email'
                },
                value: '',
                validationKey: {
                    required: true,   
                },
                valid: false,
                touched: false
            },
            
            deliveryMethod:  {
                elementType: 'select',  
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validationKey: {
                    required: true,   
                },
                valid: false
            },
            
        },
        formIsValid: false
    }

    checkValidity(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData =  {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData
        }
        this.props.onOrderBurger(order)
    }

    inputChangeHandler = (event, inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value,updatedOrderFormElement.validationKey );
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        let formIsValid = true;
        for(let inputIdentifiers in updatedOrderForm){
            formIsValid =  updatedOrderForm[inputIdentifiers].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        })        

    }
    render() {
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementArray.map((formElement)=>(
                        <Input    
                            invalid={!formElement.config.valid} 
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} 
                            shouldValidate= {formElement.config.validationKey.required}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
                    ))
                }
                <Button btnType="success" disabled={!this.state.formIsValid} >Order Here</Button>
            </form>);

        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className="ContactData">
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onOrderBurger: (orderaData) => dispatch(actions.purchaseBurger(orderaData))
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(WithErrorHandler(ContactData, axiosInstance));