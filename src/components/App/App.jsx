import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from '../Home/Home'
import Menu from '../Menu/Menu'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Logout from '../Logout/Logout'
import AddMeme from '../AddMeme/AddMeme'
import DisplayMemes from '../DisplayMemes/DisplayMemes'
import DisplayMemesByTags from '../DisplayMemesByTags/DisplayMemesByTags'
import DisplaySingleMeme from '../DisplaySingleMeme/DisplaySingleMeme'
import NotFound from '../NotFound/NotFound'

import { AlertProvider } from '../../services/Context'

class App extends Component{
    render(){
        return(
            <AlertProvider>
                <BrowserRouter>
                    <div className='container-fluid'>
                        <Menu/>
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/logout' component={Logout} />
                            <Route exact path='/add-meme' component={AddMeme} />
                            <Route exact path='/memes' component={DisplayMemes} />
                            <Route exact path='/memes/:page' component={DisplayMemes} />
                            <Route exact path='/meme/:id' component={DisplaySingleMeme} />
                            <Route exact path='/memes/category' component={DisplayMemesByTags} />
                            <Route exact path='/memes/category/:tags/:page' component={DisplayMemesByTags} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </AlertProvider>
        )
    }
}

export default App