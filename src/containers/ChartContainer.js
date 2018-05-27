import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ChartBar from './../components/ChartBar';
import Chart from './../components/Chart';
import _ from 'lodash';

import { parseJson, fetchData } from './../utilities/utilities';
import rawData from './../data.json';

const API_URL = "https://test.api.com/quotations";

export default class ChartContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedQuotation: 'AUDCAD',
            data: [],
            showAverage: false,
            average: 0,
            selectedTimeRange: 'M5'
        };

        this.changeQuotation= this.changeQuotation.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.calculateMean = this.calculateMean.bind(this);
        this.changeTimeRange = this.changeTimeRange.bind(this);
    };

    componentDidMount() {
        fetchData(`${API_URL}/${this.state.selectedQuotation}`, "GET")
            .then((data) => {
                this.setState({ data });
            });
    };

    changeQuotation(quotation) {
        this.setState({
            selectedQuotation: quotation
        });

        fetchData(`${API_URL}/${quotation}/${this.state.selectedTimeRange}`, "GET")
            .then((data) => {
                this.setState({ data });
            });
    };

    changeTimeRange(timeRange) {
        this.setState({
            selectedTimeRange: timeRange
        });

        fetchData(`${API_URL}/${this.state.selectedQuotation}/${timeRange}`, "GET")
            .then((data) => {
                this.setState({ data });
            });
    };

    refreshData() {
        fetchData(`${API_URL}/${this.state.selectedQuotation}`, "GET")
            .then((data) => {
                this.setState({ data });
            });
    };

    calculateMean() {
        let average = _.meanBy(rawData, (p) => p.price);

        this.setState({
            showAverage: !this.state.showAverage,
            average
        });

        console.log(this.state.showAverage);
    };

    render() {
        return (
            <Panel className="App-panel">
                <Panel.Heading>
                    <ChartBar
                        selectedQuotation={this.state.selectedQuotation}
                        selectedTimeRange={this.state.selectedTimeRange}
                        refreshData={this.refreshData}
                        calculateMean={this.calculateMean}
                        changeQuotation={this.changeQuotation}
                        changeTimeRange={this.changeTimeRange}
                        showAverage={this.state.showAverage} />
                </Panel.Heading>
                <Panel.Body>
                    <Chart
                        width={800}
                        height={480}
                        data={parseJson(rawData)}
                        showAverage={this.state.showAverage}
                        average={this.state.average} />
                </Panel.Body>
            </Panel>
        );
    };
}