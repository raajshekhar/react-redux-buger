import React, { Component} from 'react'
import Order from '../../components/Order/Order'
import axiosInstance from '../../axios-orders'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component{

    componentDidMount(){
        this.props.onFetchOrders()
        // axiosInstance.get('orders.json')
        //     .then((response)=>{
        //         const fetchedOrders = [];
        //         for(let key in response.data){
        //             fetchedOrders.push({
        //                 ...response.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({
        //             orders: fetchedOrders,
        //             loading: false
        //         })
        //     }).catch(()=>{
        //         this.setState({
        //             loading: false
        //         })
        //     })
    }

    render(){
        let orders = <Spinner/>
        if(this.props.orders){
            orders = (
                this.props.orders ? this.props.orders.map(data => <Order key={data.id} {...data} />) : null
            )
        }
        return(
            <div>
                { orders }
            </div>
        );
    }
} 

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dipatch => {
    return {
        onFetchOrders: () => dipatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axiosInstance))