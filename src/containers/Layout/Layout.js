import React, { Component } from 'react';
import Aux from '../Aux'
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {
    state = {
        showSideDrawer: true
    };

    sideDrawerHandler = ( ) => {
        this.setState({
            showSideDrawer: false
        })
    } 

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer 
            }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar DrawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}


export default Layout