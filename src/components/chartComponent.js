import React, { Component } from 'react';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryTooltip, createContainer, VictoryScatter, VictoryTheme } from 'victory';

export default class CustomChart extends Component {
    render = () => {
        const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

        return (
            <VictoryChart
                theme={VictoryTheme.material}
                width={this.props.width}
                height={this.props.height}
                scale={{ x: "time" }}
                domain={this.props.entireDomain}
                containerComponent={
                    <VictoryZoomVoronoiContainer
                        zoomDimension="x"
                        onZoomDomainChange={this.props.onZoomDomainChange}
                        minimumZoom={{x: 1/10000}} /> }>
                <VictoryLine style={this.props.style} labels={this.props.toolTip}
                        labelComponent={<VictoryTooltip />}
                        data={this.props.data}
                        x={this.props.xDataKey}
                        y={this.props.yDataKey} />
                {this.props.predictionPoint && <VictoryLine style={{
                        data: {
                            stroke: "red",
                            strokeWidth: 1.5,
                            strokeLinecap: "round" }
                        }} labels={this.props.toolTip}
                        labelComponent={<VictoryTooltip />}
                        data={this.props.predictionPoint}
                        x={this.props.xDataKey}
                        y={this.props.yDataKey} />}
                {this.props.showDots && <VictoryScatter
                        style={{
                            data: {
                                stroke: "orange", 
                                strokeWidth: 1, 
                                strokeLinecap: "round" }
                        }}
                        size={2}
                        data={this.props.data}
                        x={this.props.xDataKey}
                        y={this.props.yDataKey} />
                }
                {this.props.predictionPoint && this.props.showDots && <VictoryScatter
                        style={{
                            data: {
                                stroke: "orange", 
                                strokeWidth: 1, 
                                strokeLinecap: "round" }
                        }}
                        size={2}
                        data={this.props.predictionPoint}
                        x={this.props.xDataKey}
                        y={this.props.yDataKey} />
                }
                {this.props.showAverage && <VictoryScatter
                        y={(d) => this.props.average}
                        size={this.props.averageScatterSize}
                        style={{
                            data: {
                                stroke: "black",
                                strokeWidth: 1,
                                fill: "cyan",
                                strokeLinecap: "round" }
                        }} />
                }
            </VictoryChart>
        );
    };
}