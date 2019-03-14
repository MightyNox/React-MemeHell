import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Home from '../Home/Home'
import Menu from '../Menu/Menu'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Logout from '../Logout/Logout'
import AddMeme from '../AddMeme/AddMeme'
import DisplayMemes from '../DisplayMemes/DisplayMemes';

import { AlertProvider } from '../Alert/AlertContext'

class App extends Component{
    render(){
        return(
            <AlertProvider>
                <BrowserRouter>
                    <div className='container-fluid p-0'>
                        <Menu></Menu>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/logout' component={Logout} />
                        <Route exact path='/add-meme' component={AddMeme} />
                        <Route exact path='/memes' component={DisplayMemes} />
                    </div>
                </BrowserRouter>
            </AlertProvider>
        )
    }
}

export default App