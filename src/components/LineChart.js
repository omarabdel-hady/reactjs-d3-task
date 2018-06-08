import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from "d3";

LineChart.prototypes = {
    dataChart: PropTypes.array.isRequired
}
    
function LineChart({dataChart}) {
    var width = 600;
    var height = 400;
    var margin = 50;
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "5px";
    var lineStrokeHover = "4px";

    var circleOpacity = '1';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 6;
    var circleRadiusHover = 9;
    
    /* Format Data */
    var parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S%Z");
    dataChart.forEach(function(d) { 
      d.values.forEach(function(d) {
        d.x = parseDate(d.x);
        d.y = +d.y;    
      });
    });
    
    /* Scale */
    var xScale = d3.scaleTime()
        .domain(d3.extent(dataChart[0].values, d => d.x))
        .range([0, width-margin]);
    
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataChart[0].values, d => d.y)])
        .range([height-margin, 0]);
    
    var color = d3.scaleOrdinal(d3.schemeCategory10);
        /* Add SVG */
        var svg = d3.select('.chart').append("svg")
        .attr("width", (width+margin)+"px")
        .attr("height", (height+margin)+"px")
        .append('g')
        .attr("transform", `translate(${margin}, ${margin})`);
        

        /* Add line into SVG */
        var line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));
        
        let lines = svg.append('g')
        .attr('class', 'lines');
        
        lines.selectAll('.line-group')
        .data(dataChart).enter()
        .append('g')
        .attr('class', 'line-group')  
        
        .on("mouseout", function(d) {
            svg.select(".title-text").remove();
            })
        .append('path')
        .attr('class', 'line')  
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .on("mouseover", function(d) {
            d3.selectAll('.line')
                            .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
                            .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
            })
        .on("mouseout", function(d) {
            d3.selectAll(".line")
                            .style('opacity', lineOpacity);
            d3.selectAll('.circle')
                            .style('opacity', circleOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
            });
        
        
        /* Add circles in the line */
        lines.selectAll("circle-group")
        .data(dataChart).enter()
        .append("g")
        .style("fill", (d, i) => color(i))
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .attr("class", "circle")  
        .on("mouseover", function(d) {
            d3.select(this)     
                .style("cursor", "pointer")
                .append("text")
                .attr("class", "text")
                .text(`${d.y}`)
                .attr("x", d => xScale(d.x) + 5)
                .attr("y", d => yScale(d.y) - 10);
            })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("cursor", "none")  
                .transition()
                .duration(duration)
                .selectAll(".text").remove();
            })
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", circleRadius)
        .style('opacity', circleOpacity)
        .on("mouseover", function(d) {
                d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
            })
            .on("mouseout", function(d) {
                d3.select(this) 
                .transition()
                .duration(duration)
                .attr("r", circleRadius);  
            });
        
        
        /* Add Axis into SVG */
        var xAxis = d3.axisBottom(xScale).ticks(5);
        var yAxis = d3.axisLeft(yScale).ticks(5);
        
        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height-margin})`)
        .call(xAxis);
        
        svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Values");
        return (
            ''
        )
    }
    
export default LineChart