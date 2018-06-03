import React, { Component } from 'react';
import './App.css';
import Main from './containers/index';

class App extends Component {
    render = () => {
        return (
            <div className="App App-intro">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <Main />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;