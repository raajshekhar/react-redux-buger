import React from 'react'
import './Input.css'

const input = (props) => {
    let inputElement  = null;

    const inputClasses = ['InputElement']
    if(props.touched && props.invalid && props.shouldValidate){
        inputClasses.push('Invalid')
    }
    switch(props.elementType){
        case('input'):
           return inputElement = <input 
            onChange= { props.changed }
            className={inputClasses.join(' ')} {...props.elementConfig}  value={props.value} />;
        case('textarea'):
            return inputElement = <textarea
            onChange= { props.changed }
             className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
        case('select'):
            return inputElement = <select 
                className={inputClasses.join(' ')}
                onChange= { props.changed }
                value={props.value}>
                {   props.elementConfig.options.map((option,id) => (
                     <option key={id} value={option.value}> {option.displayValue}</option>
                )) }
            </select>
        default:
        inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
    }
    const validMessage = <p>Enter valid value!</p>;
    if(props.touched && props.invalid && props.shouldValidate){
        validMessage = <p>Enter valid value!</p>
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            { inputElement }
            { validMessage }
        </div>
    );
}

export default input