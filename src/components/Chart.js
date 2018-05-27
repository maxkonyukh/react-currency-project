import React, { Component } from 'react';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryTooltip, createContainer, VictoryScatter, VictoryTheme } from 'victory';
import _ from 'lodash';

import { fetchData, getFormattedTooltip } from './../utilities/utilities';

export default class Chart extends Component {
    constructor(props) {
        super(props);

        this.entireDomain = this.getEntireDomain(props);

        this.state = {
            zoomedXDomain: this.entireDomain.x,
            selectedQuotation: 'AUDCAD'
        };
    };

    getEntireDomain(props) {
        const { data } = props;
        return {
            y: [_.minBy(data, d => d.price).price, _.maxBy(data, d => d.price).price],
            x: [ data[0].datetime, _.last(data).datetime ]
        };
    };

    handleZoom(domain) {
        this.setState({
            zoomedXDomain: domain.x
        });
    };

    getData() {
        const { zoomedXDomain } = this.state;
        const { data } = this.props;
        const maxPoints = 50;
        let startIndex = data.findIndex((d) => d.datetime >= zoomedXDomain[0]);
        let endIndex = data.findIndex((d) => d.datetime > zoomedXDomain[1]);

        startIndex = startIndex > 0 ? startIndex - 1 : startIndex;
        endIndex = (endIndex !== - 1 && endIndex < data.length - 1) ? endIndex + 1 : endIndex;
        
        const filtered = data.slice(startIndex, endIndex);

        if (filtered.length > maxPoints) {
            // limit k to powers of 2, e.g. 64, 128, 256
            // so that the same points will be chosen reliably, reducing flicker
            const k = Math.pow(2, Math.ceil(Math.log2(filtered.length / maxPoints)));
            return filtered.filter(
                // ensure modulo is always calculated from same reference: i + startIndex
                (d, i) => (((i + startIndex) % k) === 0)
            );
        }
        return filtered;
    };

    render() {
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

        let renderedData = this.getData();
        return (
            <div>
                <VictoryChart
                    theme={VictoryTheme.material} width={this.props.width} height={this.props.height} scale={{ x: "time" }} domain={this.entireDomain}
                    containerComponent={
                        <VictoryZoomVoronoiContainer
                            zoomDimension="x"
                            onZoomDomainChange={this.handleZoom.bind(this)}
                            minimumZoom={{x: 1/10000}} /> }>
                    <VictoryLine style={{
                            data: {
                                stroke: "#009933", 
                                strokeWidth: 1.5, 
                                strokeLinecap: "round" }
                            }} labels={(data) => getFormattedTooltip(data)} labelComponent={<VictoryTooltip/>} data={renderedData} x="datetime" y="price" />
                    <VictoryScatter style={{
                            data: {
                                stroke: "orange", 
                                strokeWidth: 1, 
                                strokeLinecap: "round" }
                            }} size={2} data={renderedData} x="datetime" y="price" />
                    {this.props.showAverage && <VictoryScatter y={(d) => this.props.average} size={2}
                            style={{
                                data: {
                                    stroke: "black",
                                    strokeWidth: 1,
                                    fill: "cyan",
                                    strokeLinecap: "round" }
                            }} />
                    }
                </VictoryChart>
            </div>
        );
    };
}