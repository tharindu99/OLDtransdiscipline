import React, {useEffect,useRef, useState} from 'react'
import { Segment, Grid, Button } from 'semantic-ui-react'
import * as d3 from 'd3';
import ThresholdPicker from '../thresholdpicker'
import './MatrixViz.css'



const MatrixViz = ({data}) => {

    const [ColorChanges, setColorChanges] = useState({LB:0.1,UB:0.2})

    const links_tmp = data.map(d=>{
        return{
            source:d.doc1,
            target:d.doc2,
            value:d.cosine
        }
    }) 
    const tmp_nodes = []

    links_tmp.forEach(d => {
        tmp_nodes.push(d.source)
        tmp_nodes.push(d.target)
    });

    const tmp_nodes1 = [... new Set(tmp_nodes)]

    const nodes = tmp_nodes1.map(d=>{
        return{
            name:d,
            group: 0
        }
    })

    const links = links_tmp.map(d=>{
        return{
            source: nodes.findIndex(e => e.name === d.source),
            target: nodes.findIndex(e => e.name === d.target),
            value: d.value
        }
    })

    const colorFunc = (value) =>{
        if(value <= ColorChanges.LB){
            return 'white'
        }else if (value >= ColorChanges.UB){
            return 'red'
        }else{
            const colorScale = d3.scaleQuantize()
                .domain([ColorChanges.LB,ColorChanges.UB])
                .range(d3.schemeCategory10)
                //.range(d3.schemeSpectral[10]);
            return colorScale(value)
        }

    }

    useEffect(() => {

        d3.selectAll('svg').remove();

        let margin = {top: 80, right: 0, bottom: 10, left: 40},
            width = 900,
            height = 900;
    
        let x = d3.scaleBand().range([0, width]),
            z = d3.scaleLinear().domain([0,1000]).clamp(true),
            colorMe = d3.scaleOrdinal().domain([0,0.1]).range(d3.schemeYlOrBr[9])
    
        let svg = d3.select("#mapX").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("margin-left", margin.left + "px")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let matrix = [], n = nodes.length

        nodes.forEach(function(node, i) {
            node.index = i;
            node.count = 0;
            matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
        });
        links.forEach(function(link) {
            matrix[link.source][link.target].z = link.value + 0.0000001;
            matrix[link.target][link.source].z = link.value + 0.0000001;
           // matrix[link.target][link.source].z = link.value;
            
            // matrix[link.source][link.source].z = link.value;
            // matrix[link.target][link.target].z = link.value;
            
            nodes[link.source].count += link.value;
            nodes[link.target].count += link.value;
        });

       
        ///////
        let orders = {
            name: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].name, nodes[b].name); }),
            count: d3.range(n).sort(function(a, b) { return nodes[b].count - nodes[a].count; }),
            group: d3.range(n).sort(function(a, b) { return nodes[b].group - nodes[a].group; })
        };
        x.domain(orders.name);
        svg.append("rect")
            .attr("class", "background")
            .attr("width", width)
            .attr("height", height);

        let row = svg.selectAll(".row")
            .data(matrix)
            .enter().append("g")
            .attr("class", "row")
            .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
            .each(row1);

        row.append("line")
            .attr("x2", width);

        row.append("text")
            .attr("x", -6)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("font-size","7px")
            .attr("text-anchor", "end")
            .text(function(d, i) { return nodes[i].name; });

        let column = svg.selectAll(".column")
            .data(matrix)
            .enter().append("g")
            .attr("class", "column")
            .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
      
            column.append("line")
                .attr("x1", -width);
      
        column.append("text")
            .attr("x", 6)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "start")
            .attr("font-size","7px")
            .text(function(d, i) { return nodes[i].name; });

        function row1(row) {
            let cell = d3.select(this).selectAll(".cell")
                        .data(row.filter(function(d) { return d.z; }))
                        .enter().append("rect")
                        .attr("class", "cell")
                        .attr("x", function(d) { return x(d.x); })
                        .attr("width", x.bandwidth())
                        .attr("height", x.bandwidth())
                        //.style("fill-opacity", function(d) { return z(d.z); })
                        .style("fill", function(d) { return colorFunc(d.z) })
                        .on("mouseover", mouseover)
                        .on("mouseout", mouseout);
        }
        function mouseover(p) {
            d3.selectAll(".row text").classed("active", function(d, i) {  return i == p.y; });
            d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
        }
        function mouseout() {
            d3.selectAll("text").classed("active", false);
        }

        d3.select("#order").on("change", function() {
            clearTimeout(timeout);
            order(this.value);
        });

        function order(value) {
            x.domain(orders[value]);
            let t = svg.transition().duration(2500);
            t.selectAll(".row")
                .delay(function(d, i) { return x(i) * 4; })
                .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
                .selectAll(".cell")
                .delay(function(d) { return x(d.x) * 4; })
                .attr("x", function(d) { return x(d.x); });
            
            t.selectAll(".column")
                .delay(function(d, i) { return x(i) * 4; })
                .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
            }
            
            let timeout = setTimeout(function() {
                order("group");
                d3.select("#order").property("selectedIndex", 2).node().focus();
            }, 5000);
      
        //console.log(x.bandwidth())
    }, [ColorChanges]);

    const setThreshold = (e) =>{
        setColorChanges(e)
    }
   
    console.log(ColorChanges)

    return(
        <Segment>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={13}>
                        <ThresholdPicker Threshold={setThreshold} data={data} ></ThresholdPicker>
                    </Grid.Column>
                   
                    <Grid.Column width={3}>
                        <select id="order">
                            <option value="name">by Name</option>
                            <option value="count">by Frequency</option>
                            <option value="group">by Cluster</option>
                        </select>

                            {/* <Dropdown
                                fluid
                                selection
                                options={dropDownOptions}
                                onChange={dropDownHandler}
                                
                            /> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row >
                    <Grid.Column center>
                        <div id={'mapX'}></div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
}

export default MatrixViz;