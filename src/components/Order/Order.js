import React from 'react'
import './Order.css'
const order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map((ig,index) => {
        const timeStamp = new Date().getTime() + ig.name + index 
        return (
            <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0px 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
             key={timeStamp}> {ig.name}: {ig.amount} </span>
        )
    })

    ingredientOutput.push(
        <div key={new Date().getTime()} style={{
            marginTop: '10px'
        }}>Amount: {props.price}</div>
    )

 return(  
     
     
     <div className="Order">
   Ingredients:  {ingredientOutput.length ? ingredientOutput : 'No data found!'}
   <br/>
        {/* <div>Ingredients: {
    Object.keys(props.ingredients ? props.ingredients : []).map( (data, index) => (
        <p key={index}>{data}: { props.ingredients[data]}</p>
    ))
}
        </div>
        <p>Price: <strong>USD: {+props.price}</strong></p>*/}
    </div> 
);
}
export default order;