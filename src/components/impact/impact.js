import React, { useState, useEffect } from 'react';
import { Segment, Button, Grid } from "semantic-ui-react"
import ReactECharts from 'echarts-for-react';
import * as d3 from "d3";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


let links = []

const finder_auth_id= (dataAll) => {
    const auth = dataAll.auth
    for (let a1 = 0; a1 < auth.length; a1++) {
        for (let a2 = a1+1; a2 < auth.length; a2++) {
            links.push({
                'source': auth[a1],
                'target': auth[a2],
                'research': dataAll
            })
        }
        
    }

}

function graphCalculation(data,pickedYear){
    
    let Authors = []
    // let categories = [
    //     {
    //         "name": "Bilal Khan"
    //       },
    //       {
    //         "name": "Co-Authors"
    //       }
    // ]
    
    data.map(d => {
        return (
            d.auth = String(d.Authors).split('#')
        )
    });

    data.forEach(e => {
        e.auth.forEach(au => {
            Authors.push(au)
        })
    });
    Authors = [...new Set(Authors)];
    let nodes_init = Authors.map((d,i) => {
        if(d == 'Bilal Khan '){
            return{
                id:d,
                name:d,
                category: 0,
                symbolSize: 20,
                years:[]
               // x: Math.random(),
               // y: Math.random()

            }
        }else{
            return {
                id:d,
                name:d,
                category: 1,
                symbolSize: 10,
                years:[]
               // x: Math.random(),
               // y: Math.random()
            }
        }
    }) 

    data.forEach(d => {
        finder_auth_id(d,links)
        d.auth.forEach(d1 => {
            let yr_arr = nodes_init.find(o => o.name === d1).years
            if(yr_arr.indexOf(parseInt(d.Year)) === -1){
                yr_arr.push(parseInt(d.Year))
            }
            
            
        })
    })
    const marks = {
        '1998':1998,
        '1999':1999,
        '2000':2000,
        '2001':2001,
        '2002':2002,
        '2003':2003,
        '2004':2004,
        '2005':2005,
        '2006':2006,
        '2007':2007,
        '2008':2008,
        '2009':2009,
        '2010':2010,
        '2011':2011,
        '2012':2012,
        '2013':2013,
        '2014':2014,
        '2015':2015,
        '2016':2016,
        '2017':2017,
        '2018':2018,
        '2019':2019,
        '2020':2020,
        '2021':2021
    }

    function calculate_nodeSize(year,pickedYear){
        let min_diff_yr = 250
        year.forEach(d => {
            if(!isNaN(d)){
                const diff_yr = Math.abs(d-pickedYear)
                //console.log(d+" "+pickedYear+" "+diff_yr)
                if(min_diff_yr >= diff_yr){
                    min_diff_yr = diff_yr
                }
            }
        })
        if(min_diff_yr == 250)min_diff_yr = 1
        //console.log(min_diff_yr)

        let sqrtScale = d3.scaleSqrt().domain([0, 23]).range([0, 20]);
        return 24 - sqrtScale(min_diff_yr)
    }

    nodes_init.forEach(d =>{
        d.symbolSize = calculate_nodeSize(d.years,pickedYear)
        // if(isNaN(d.years[0])){
        //     d.symbolSize = 2
        // }else{
        //     d.symbolSize = Math.abs(d.years[0]-pickedYear)
        // }
        
    })

    return({
        nodes:nodes_init.filter(d=> {return d.name != 'Bilal Khan '}),
        links:links.filter(d => {return d.source != 'Bilal Khan '}),
        //categories:categories,
        marks:marks
    })
}

const Impact_cmp = ({data}) => {

    const [pickedYear, setpickedYear] = useState(2021);
    let graph = graphCalculation(data,pickedYear)
    
    const handleChange = (e) =>{
        setpickedYear(e)
    }

    return (
        <Segment>
            <Grid>
                <Grid.Column width={14}>
                    <ReactECharts style={{height:500}}
                    option={
                        
                        {
                            tooltip: {
                                formatter: function (e) {
                                    if(e.dataType == 'node'){
                                        if(e.data.name == 'Bilal Khan '){
                                            return `
                                            ${e.data.name}
                                        `;
                                        }else{
                                            return `
                                            ${e.data.name}<br />
                                            ${e.data.years}
                                        `;
                                        }
                                        
                                    }else if(e.dataType == 'edge'){
                                        return (
                                            `${e.data.source}>${e.data.target}<br />
                                            ${e.data.research.Title}<br />
                                            ${e.data.research.Year}
                                            `
                                        )
                                        ;
                                    }else{
                                        return ``;
                                    }
                                    
                                }
                            },
                            
                            // legend: [{
                            //     data: graph.categories.map(function (a) {
                            //         return a.name;
                            //     }),
                            //     bottom:0
                            // }],
                            
                            animationEasingUpdate: 'quinticInOut',
                            series: [
                                {
                                    name: 'co-author network',
                                    type: 'graph',
                                    layout: 'force',
                                    data: graph.nodes,
                                    links: graph.links,
                                    //categories: graph.categories,
                                    roam: true,
                                    label: {
                                        position: 'right'
                                    },
                                    force: {
                                        repulsion: 100
                                    },
                                    emphasis: {
                                        focus: 'adjacency',
                                        lineStyle: {
                                            width: 4
                                        }
                                    },
                                }
                            ]
                        }
                    }
                />
                </Grid.Column>
                <Grid.Column width={2}>
                    <Slider onChange={handleChange} vertical min={1998} max={2021} marks={graph.marks} step={1} included={false} defaultValue={pickedYear} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default Impact_cmp