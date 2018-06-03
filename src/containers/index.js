import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ChartBar from './../components/chartBarComponent';
import ChartContainer from './chartContainer';
import _ from 'lodash';

import { parseJson, fetchData } from './../utilities/utilities';
import rawData from './../data.json';

const API_URL = "https://test.api.com/quotations";

export default class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedQuotation: 'AUDCAD',
            data: parseJson(rawData),
            showAverage: false,
            average: 0,
            selectedTimeRange: 'M5'
        };
    };

    componentWillMount = () => {
        // fetchData(`${API_URL}/${this.state.selectedQuotation}`, "GET")
        //     .then((data) => {
        //         this.setState({ data });
        //     });
    };

    changeQuotation = (quotation) => {
        this.setState({
            selectedQuotation: quotation
        });

        fetchData(`${API_URL}/${quotation}/${this.state.selectedTimeRange}`, "GET")
            .then((data) => {
                this.setState({ data });
            });
    };

    changeTimeRange = (timeRange) => {
        this.setState({
            selectedTimeRange: timeRange
        });

        fetchData(`${API_URL}/${this.state.selectedQuotation}/${timeRange}`, "GET")
            .then((data) => {
                this.setState({ data });
            });
    };

    refreshData = () => {
        fetchData(`${API_URL}/${this.state.selectedQuotation}`, "GET")
            .then((data) => {
                this.setState({ data });
            });
    };

    calculateAverage = () => {
        let average = _.meanBy(this.state.data, (p) => p.price);

        this.setState({
            showAverage: !this.state.showAverage,
            average
        });
    };

    render = () => {
        return (
            <Panel className="App-panel">
                <Panel.Heading>
                    <ChartBar
                        selectedQuotation={this.state.selectedQuotation}
                        selectedTimeRange={this.state.selectedTimeRange}
                        refreshData={this.refreshData}
                        calculateAverage={this.calculateAverage}
                        changeQuotation={this.changeQuotation}
                        changeTimeRange={this.changeTimeRange}
                        showAverage={this.state.showAverage} />
                </Panel.Heading>
                <Panel.Body>
                    <ChartContainer
                        data={this.state.data}
                        showAverage={this.state.showAverage}
                        average={this.state.average} />
                </Panel.Body>
            </Panel>
        );
    };
}