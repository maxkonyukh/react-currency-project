import React, { Component } from 'react';
import CustomChart from './../components/chartComponent';
import _ from 'lodash';

export default class ChartContainer extends Component {
    constructor(props) {
        super(props);
        
        this.entireDomain = this.getEntireDomain(this.props.data, "datetime", "price");
        this.anotherDomain = this.getEntireDomain(this.props.data, "datetime", "price");

        this.state = {
            zoomedX: this.entireDomain.x,
            anotherZoomedX: this.anotherDomain.x,
            selectedQuotation: 'AUDCAD'
        };
    };

    getEntireDomain = (data, xKey, yKey) => {
        console.log(data);
        return {
            y: [_.minBy(data, d => d[yKey])[yKey], _.maxBy(data, d => d[yKey])[yKey]],
            x: [ data[0][xKey], _.last(data)[xKey] ]
        };
    };

    getData = (data, xDomain, maxPoints) => {
        let startIndex = data.findIndex((d) => d.datetime >= xDomain[0]);
        let endIndex = data.findIndex((d) => d.datetime > xDomain[1]);

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

    render = () => {
        let renderedData = this.getData(
            this.props.data,
            this.state.zoomedX,
            50
        );

        let anotherRenderedData = this.getData(
            this.props.data,
            this.state.anotherZoomedX,
            50
        );

        return (
            <div>
                <CustomChart
                    width={800}
                    height={350}
                    entireDomain={this.entireDomain}
                    onZoomDomainChange={(domain) => { this.setState({ zoomedX: domain.x }) }}
                    data={renderedData}
                    showDots={true}
                    xDataKey="datetime"
                    yDataKey="price"
                    style={{
                        data: {
                            stroke: "#009933",
                            strokeWidth: 1.5,
                            strokeLinecap: "round" }
                        }}
                    predictionPoint={
                        [ renderedData[renderedData.length - 1], {
                            "datetime": new Date("2018-04-15 00:00:00"),
                            "price": 0.98278
                        } ]} />
                <CustomChart
                    width={800}
                    height={200}
                    entireDomain={this.anotherDomain}
                    onZoomDomainChange={(domain) => { this.setState({ anotherZoomedX: domain.x }) }}
                    data={anotherRenderedData}
                    showAverage={this.props.showAverage}
                    averageScatterSize={2}
                    average={this.props.average}
                    showDots={true}
                    xDataKey="datetime"
                    yDataKey="price"
                    style={{
                        data: {
                            stroke: "red",
                            strokeWidth: 1.5,
                            strokeLinecap: "round" }
                        }} />
            </div>
        );
    };
}