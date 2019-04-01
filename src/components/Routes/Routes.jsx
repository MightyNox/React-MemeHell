import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../Home/Home'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Logout from '../Logout/Logout'
import AddMeme from '../AddMeme/AddMeme'
import DisplayMemes from '../DisplayMemes/DisplayMemes'
import SelectCategory from '../SelectCategory/SelectCategory'
import DisplaySingleMeme from '../DisplaySingleMeme/DisplaySingleMeme'
import NotFound from '../NotFound/NotFound'
import Context from '../Context/Context'

class Routes extends Component {

    state = {
        loaded : false
    }

    render() {
        if (!this.state.loaded){
            return null
        }

        return(
            <Switch>
                {/* Basic Routes */}
                <Route exact path='/' component={Home} />
                <Route exact path='/memes' component={DisplayMemes} />
                <Route exact path='/memes/:page' component={DisplayMemes} />

                {/* Auth Depending Routes */}
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/logout' component={Logout} />
                <Route exact path='/add-meme' component={AddMeme} />
                <Route exact path='/meme/:id' component={DisplaySingleMeme} />
                <Route exact path='/select-category' component={SelectCategory} />
                <Route exact path='/category/:tags/:page' component={SelectCategory} />

                {/* 404 Not Found */}
                <Route component={NotFound} />
            </Switch>   
        )
    }

    authStatus = async() => {
        if(localStorage.getItem("token")) {
            await this.context.setSignedIn(true)
        }else{
            await this.context.setSignedIn(false);
        }
    }

    componentDidMount = async() => {
        await this.authStatus()
        await this.setState({loaded : true})
    }
}

Routes.contextType = Context

export default Routes