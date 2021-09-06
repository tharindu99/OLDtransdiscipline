import React, {useEffect,useRef, useState} from 'react'
import { Segment, Grid, Button, Rail,Sticky, Header } from 'semantic-ui-react'
import * as d3 from 'd3';
import ThresholdPicker from '../thresholdpicker'
import './MatrixViz.css'
import FurtherInfo from './furtherInfo'



const MatrixViz = ({data,nodeclusters,pdf_files, publications}) => {

    const [ColorChanges, setColorChanges] = useState({LB:0.1,UB:0.2})
    const [ClusterValue, setClusterValue] = useState("name")
    const [DocsDetails, setDocsDetails] = useState({'similarity':0, docs:[]})
    

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

        const clusterVal = nodeclusters.find(e => e.doc == d ) 
        
        return{
            name:d,
            group: 0,
            clusters2: parseInt(clusterVal.clusters2),
            clusters3: parseInt(clusterVal.clusters3),
            clusters4: parseInt(clusterVal.clusters4),
            clusters5: parseInt(clusterVal.clusters5),
            clusters6: parseInt(clusterVal.clusters6),
            clusters7: parseInt(clusterVal.clusters7),
            clusters8: parseInt(clusterVal.clusters8),
            clusters9: parseInt(clusterVal.clusters9),
            clusters10: parseInt(clusterVal.clusters10),
            clusters11: parseInt(clusterVal.clusters11),
            clusters12: parseInt(clusterVal.clusters12),
            clusters13: parseInt(clusterVal.clusters13),
            clusters14: parseInt(clusterVal.clusters14),
            clusters15: parseInt(clusterVal.clusters15),
            clusters16: parseInt(clusterVal.clusters16),
            clusters17: parseInt(clusterVal.clusters17),
            clusters18: parseInt(clusterVal.clusters18),
            clusters19: parseInt(clusterVal.clusters19),
            clusters20: parseInt(clusterVal.clusters20)
        }
    })

    const links = links_tmp.map(d=>{
        return{
            source: nodes.findIndex(e => e.name === d.source),
            target: nodes.findIndex(e => e.name === d.target),
            value: d.value
        }
    })

    const nameColor = (v) => {

            const colorMe = d3.scaleQuantize()
                .domain([0,20])
                .range(d3.schemeCategory10)

            return colorMe(v)
    }
        


    const colorFunc = (value) =>{
        if(value <= ColorChanges.LB){
            return 'white'
        }else if (value >= ColorChanges.UB){
            return 'red'
        }else{
            const colorScale = d3.scaleQuantize()
                .domain([ColorChanges.LB,ColorChanges.UB])
                .range(d3.schemeCategory10)

            // const colorScale = d3.scaleSequential()
            //     .domain([ColorChanges.LB,ColorChanges.UB])
            //     .range(d3.schemeOranges[9])
                
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
            
            nodes[link.source].count = link.value;
            nodes[link.target].count = link.value;
        });
        

       
        ///////
        let orders = {
            name: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].name, nodes[b].name); }),
            count: d3.range(n).sort(function(a, b) { return nodes[b].count - nodes[a].count; }),
            clusters2: d3.range(n).sort(function(a, b) { return nodes[b].clusters2 - nodes[a].clusters2; }),
            clusters3: d3.range(n).sort(function(a, b) { return nodes[b].clusters3 - nodes[a].clusters3; }),
            clusters4: d3.range(n).sort(function(a, b) { return nodes[b].clusters4 - nodes[a].clusters4; }),
            clusters5: d3.range(n).sort(function(a, b) { return nodes[b].clusters5 - nodes[a].clusters5; }),
            clusters6: d3.range(n).sort(function(a, b) { return nodes[b].clusters6 - nodes[a].clusters6; }),
            clusters7: d3.range(n).sort(function(a, b) { return nodes[b].clusters7 - nodes[a].clusters7; }),
            clusters8: d3.range(n).sort(function(a, b) { return nodes[b].clusters8 - nodes[a].clusters8; }),
            clusters9: d3.range(n).sort(function(a, b) { return nodes[b].clusters9 - nodes[a].clusters9; }),
            clusters10: d3.range(n).sort(function(a, b) { return nodes[b].clusters10 - nodes[a].clusters10; }),
            clusters11: d3.range(n).sort(function(a, b) { return nodes[b].clusters11 - nodes[a].clusters11; }),
            clusters12: d3.range(n).sort(function(a, b) { return nodes[b].clusters12 - nodes[a].clusters12; }),
            clusters13: d3.range(n).sort(function(a, b) { return nodes[b].clusters13 - nodes[a].clusters13; }),
            clusters14: d3.range(n).sort(function(a, b) { return nodes[b].clusters14 - nodes[a].clusters14; }),
            clusters15: d3.range(n).sort(function(a, b) { return nodes[b].clusters15 - nodes[a].clusters15; }),
            clusters16: d3.range(n).sort(function(a, b) { return nodes[b].clusters16 - nodes[a].clusters16; }),
            clusters17: d3.range(n).sort(function(a, b) { return nodes[b].clusters17 - nodes[a].clusters17; }),
            clusters18: d3.range(n).sort(function(a, b) { return nodes[b].clusters18 - nodes[a].clusters18; }),
            clusters19: d3.range(n).sort(function(a, b) { return nodes[b].clusters19 - nodes[a].clusters19; }),
            clusters20: d3.range(n).sort(function(a, b) { return nodes[b].clusters20 - nodes[a].clusters20; })

            // group: d3.range(n).sort(function(a, b) { return nodes[b].group - nodes[a].group; })
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
            .attr('stroke','black')
            .style("stroke-width", 0.1)
            .each(row1);

        row.append("line")
            .attr("x2", width);

        let row_txt =  row.append("text")
            .attr("class","rowText")
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
            .attr('stroke','black')
            .style("stroke-width", 0.1)
            .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
      
            column.append("line")
                .attr("x1", -width);
      
        column.append("text")
            .attr("x", 6)
            .attr("y", x.bandwidth() / 2)
            .attr("dy", ".32em")
            .attr("text-anchor", "start")
            .attr("font-size","7px")
           // .style('fill', (d,i) => ( nameColor(nodes[i].clusters10)))
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
                        .on("click", mouseclick)
                        .on("mouseout", mouseout);
        }
        function mouseover(event,d) {

            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", 2)

            var xPos = d3.select(this).attr('x')
            var yPos = d3.select(this).attr('y')
           
            svg.append('text')
                .attr({
                    'class': 'tooltip',
                    'x': xPos + 30,
                    'y': yPos - 15,
                    'text-anchor': 'middle',
                    'font-family': 'sans-serif',
                    'font-size': '14px',
                    'font-weight': 'bold',
                    'fill': 'black'
                })
                //.text('kkk');
            

            // d3.selectAll(".row text").classed("active", function(d, i) {  return i == p.y; });
            // d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
        }

        function mouseclick (event,d) {

            // console.log(nodes[d.x].name)
            // console.log(nodes[d.y].name)
            setDocsDetails({
                similarity: d.z,
                docs: [
                    {'docID': nodes[d.x].name.slice(3)},
                    {'docID': nodes[d.y].name.slice(3)}
                ]
            }
            )
            // Tooltip
            //   .html("The exact value of<br>this cell is: " + d)
            //   .style("left", (d3.mouse(this)[0]+70) + "px")
            //   .style("top", (d3.mouse(this)[1]) + "px")
        }

        function mouseout() {
            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", 0.1)
            // Tooltip
            //  .style("opacity", 0)
            // d3.select(this)
            // .style("stroke", "none")
            // .style("opacity", 0.8)
            // //d3.selectAll("text").classed("active", false);
        }

        d3.select("#order").on("change", function() {
            clearTimeout(timeout);
            order(this.value)
            
        });

        function order(value) {
            setClusterValue(value)
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
                //order("group");
                d3.select("#order").property("selectedIndex", 2).node().focus();
            }, 5000);
      
        //console.log(x.bandwidth())
    }, [ColorChanges]);

    const setThreshold = (e) =>{
        setColorChanges(e)
    }


    return(
        <>
        <Segment>
            <Grid>
                <Grid.Row >
                    <Grid.Column width={10}>
                        <ThresholdPicker Threshold={setThreshold} data={data} ></ThresholdPicker>
                    </Grid.Column>                
                    <Grid.Column width={3}>
                        <select id="order">
                            <option value="name" selected='selected' >by Name</option>
                            <option value="count">by Frequency</option>
                            <option value="clusters2">by Clusters2</option>
                            <option value="clusters3">by Clusters3</option>
                            <option value="clusters4">by Clusters4</option>
                            <option value="clusters5">by Clusters5</option>
                            <option value="clusters6">by Clusters6</option>
                            <option value="clusters7">by Clusters7</option>
                            <option value="clusters8">by Clusters8</option>
                            <option value="clusters9">by Clusters9</option>
                            <option value="clusters10">by Clusters10</option>
                            <option value="clusters11">by Clusters11</option>
                            <option value="clusters12">by Clusters12</option>
                            <option value="clusters13">by Clusters13</option>
                            <option value="clusters14">by Clusters14</option>
                            <option value="clusters15">by Clusters15</option>
                            <option value="clusters16">by Clusters16</option>
                            <option value="clusters17">by Clusters17</option>
                            <option value="clusters18">by Clusters18</option>
                            <option value="clusters19">by Clusters19</option>
                            <option value="clusters20">by Clusters20</option>
                            {/* <option value="group">by Cluster</option> */}
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
        
       
       <FurtherInfo data={DocsDetails} pdf_files={pdf_files} publications={publications}></FurtherInfo>
            
        </>
    )
}

export default MatrixViz;