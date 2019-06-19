import React from 'react'
import './Sidedrawer.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItem'
import BackDrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'

const sideDrawer = (props) => {
    let attachClasses  = ['SideDrawer', 'Close'];
    if(props.open) attachClasses = ['SideDrawer', 'Open'];
    return (
        <Aux>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={ attachClasses.join(' ') }>
            <div className="Logo-sidedrawer">
                <Logo/> 
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Aux>
    );
};

export default sideDrawer;