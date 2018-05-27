import React, { Component } from 'react';
import './App.css';
import ChartContainer from './containers/ChartContainer';

class App extends Component {
    render() {
        return (
            <div className="App App-intro">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <ChartContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default App;