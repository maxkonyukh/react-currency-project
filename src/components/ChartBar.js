import React, { Component } from 'react';
import { ButtonToolbar, Button, SplitButton, MenuItem } from 'react-bootstrap';

const timeRange = [ "M5", "M15", "M30", "H1", "H4", "D1", "W1", "MN" ];
const quotations = [ "AUDCAD", "EURUSD" ];

export default class ChartBar extends Component {
    render() {
        return (
            <ButtonToolbar>
                <Button onClick={this.props.refreshData}>Refresh</Button>
                <SplitButton
                        title={this.props.selectedQuotation}
                        id="1"
                        id="split-button-basic-1"
                        onSelect={this.props.changeQuotation}>
                    {quotations.map((item, index) =>
                        <MenuItem key={index} eventKey={item}>{item}</MenuItem>
                    )}
                </SplitButton>
                <SplitButton
                        title={this.props.selectedTimeRange}
                        id="1"
                        id="split-button-basic-1"
                        onSelect={this.props.changeTimeRange}>
                    {timeRange.map((item, index) =>
                        <MenuItem key={index} eventKey={item}>{item}</MenuItem>
                    )}
                </SplitButton>
                <Button 
                    bsStyle={this.props.showAverage ? "primary" : "default" }
                    onClick={this.props.calculateMean}>
                    Mean
                </Button>
            </ButtonToolbar>
        );
    };
}