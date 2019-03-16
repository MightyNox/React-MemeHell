import React, { Component } from 'react'

import AlertContext from '../Alert/AlertContext'

class Home extends Component {

    render() {
        return (
            <div>
                <blockquote className="blockquote text-center">
                    <h1>Featured</h1>

                    <br/>

                    <p className="mb-0">
                        Meme hell is the most awesome source  <br/>
                        of gaining knowledge and sharing experiences <br/> with another people using memes! 
                        <span role="img" aria-label="*-*"> 🤩</span>
                    </p>
                    <footer className="blockquote-footer">Adam Mickiewicz</footer>

                    <br/>

                    <p className="mb-0">
                        It is the first time i can agree with the gentleman who wrote above. 
                        <span role="img" aria-label=":P"> 😜</span>
                    </p>
                    <footer className="blockquote-footer">Juliusz Słowacki</footer>

                    <br/>

                    <p className="mb-0">
                        Penguins and other specimens visit this site during the mating season. 
                        <span role="img" aria-label="penguin"> 🐧</span>
                    </p>
                    <footer className="blockquote-footer">Krystyna Czubówna read</footer>

                    <br/>

                    <p className="mb-0">
                        Even Caesar loves Meme Hell. 
                        <span role="img" aria-label="dagger"> 🔪</span>
                    </p>
                    <footer className="blockquote-footer">Brutus</footer>
                </blockquote>
            </div>
        )
    }

    componentWillUnmount(){
        if(this.context.state.alert !== null){
            this.context.setAlert(null)
        }
    }
}

Home.contextType = AlertContext

export default Home