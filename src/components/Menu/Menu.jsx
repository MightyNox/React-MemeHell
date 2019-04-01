import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import Alert from "../Alert/Alert"
import Context from '../Context/Context'
import './menu.css'

class Menu extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="fixed-top">
                    <nav className="navbar bg-dark">
                        <div className="navbar-brand">
                            <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt="logo" />
                        </div>
                    
                    
                        <div className="navbar-nav">
                            {/* Home */}
                            <Link to="/">
                                <button className="btn-menu" type="button">
                                    <i className="fas fa-home" />
                                </button>
                            </Link>
                        </div>
                        <div className="navbar-nav">
                            {/* Memes */}
                            <Link to="/memes">
                                <button className="btn-menu-text" type="button">
                                    <i className="fas fa-biohazard"/>
                                </button>
                            </Link>
                        </div>
                        
                        {/* Dynamic Links */}
                        {this.customizeNavBarMenu()}

                        <div className="dropdown">
                            <button className="btn-menu">
                                <i className="fas fa-bars" />
                            </button>
                            <div className="dropdown-content">
                                {/* Home */}
                                <Link to="/">
                                    <i className="fas fa-home" />
                                </Link>

                                {/* Memes */}
                                <Link to="/memes">
                                    <i className="fas fa-biohazard"/>
                                </Link>

                                {/* Dynamic Links */}
                                {this.customizeDropDownMenu()}
                            </div>
                        </div>
                    </nav>

                <Alert />

                </div>
            </React.Fragment>
        )
    }

    customizeNavBarMenu(){
        if(this.context.state.signedIn){
            return (
                <React.Fragment>
                    <div className="navbar-nav">
                        {/* Memes Tag */}
                        <Link to="/select-category">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-hashtag"/>
                            </button>
                        </Link>
                    </div>
                    <div className="navbar-nav">
                        {/* Add Meme */}
                        <Link to="/add-meme">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-file-upload"/>
                            </button>
                        </Link>
                    </div>
                    <div className="navbar-nav ml-auto">
                        {/* Logout */}
                        <Link to="/logout">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-sign-out-alt" />
                            </button>
                        </Link>
                    </div>
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                    <div className="navbar-nav ml-auto">
                        {/* Register */}
                        <Link to="/register">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-user-plus" />
                            </button>
                        </Link>
                    </div>
                    <div className="navbar-nav">
                        {/* Login */}
                        <Link to="/login">
                            <button className="btn-menu" type="button">
                                <i className="fas fa-sign-in-alt" />
                            </button>
                        </Link>
                    </div>
                </React.Fragment>
            )
        }
    }

    customizeDropDownMenu(){
        if(this.context.state.signedIn){
            return(
                <div>
                    {/* Memes Tag */}
                    <Link to="/select-category">
                        <i className="fas fa-hashtag"/>
                    </Link>
                    
                    {/* Add Meme */}
                    <Link to="/add-meme">
                        <i className="fas fa-file-upload"/>
                    </Link>

                    {/* Logout */}
                    <Link to="/logout">
                        <i className="fas fa-sign-out-alt" />
                    </Link>
                </div>
            )
        }else{
            return(
                <div>
                    {/* Register */}
                    <Link to="/register">
                        <i className="fas fa-user-plus" />
                    </Link>

                    {/* Login */}
                    <Link to="/login">
                        <i className="fas fa-sign-in-alt" />
                    </Link>
                </div>
            )
        }
    }
}

Menu.contextType = Context

export default Menu



