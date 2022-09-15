import React, { Component } from 'react'
import '../App.css'
import { scaleBand } from 'd3-scale'
import { select } from 'd3-selection'
import { axisBottom } from 'd3'

class BarChart extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        let node = this.node;

        let data = this.props.monthInfo;

        let xScale = scaleBand()
            .domain(data.map((s) => s.title))
            .range([10, 450])
            .padding([0.5])

        let xKey = (d) => {
            return d.title;
        }

        let yKey = (d) => {
            return d.price;
        }

        select(node)
            .append("g")
            .attr("transform", "translate(10, 450)")
            .call(axisBottom(xScale))

        select(node)
            .selectAll("rect")
            .data(data, xKey)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xScale(xKey(d)))
            .attr("y", (d) => 450 - d.price)
            .attr("height", (d, i) => yKey(d))
            .attr("width", xScale.bandwidth())
            .style("fill", "#69b3a2")
            .style("opacity", 0.5)

    }

    render() {
        return <svg ref={node => this.node = node}
            width={500} height={500}>
        </svg>
    }
}

export default BarChart

