import React, { useState, useEffect } from 'react';
import { Segment, Button, Grid } from "semantic-ui-react"
import ReactECharts from 'echarts-for-react';
import * as d3 from "d3";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';


let links = []

const Impact_cmp_new = ({data}) => {

    const [graph,setgraph] = useState({nodes:[],links:[],categories:[]})

    const graph_calc = (auth) => {
        
    }

    const data_ByYear = d3.group(data, d => parseInt(d.Year))
    const timeline = [...data_ByYear.keys()].sort()
    let sereies = []

    timeline.forEach(t => {
        
    });

    let option_custom = []
    let timeline_data_custom = []

    console.log(timeline)

    // for (var n = 0; n < timeline.length; n++) {
    //     timeline_data_custom.push(timeline[n]);
    //     option_custom.push({
    //         title: {
    //             show: true,
    //             'text': timeline[n] + ''
    //         },
    //         series: {
    //             name: 'Researcher',
    //             type: 'graph',
    //             layout: 'force',
    //             data: graph.nodes,
    //             links: graph.links,
    //             //categories: graph.categories,
    //             roam: true,
    //             label: {
    //                 position: 'right',
    //                 formatter: '{b}'
    //             },
    //             lineStyle: {
    //                 color: 'red',
    //                 curveness: 0.3
    //             },
    //             // emphasis: {
    //             //     focus: 'adjacency',
    //             //     lineStyle: {
    //             //         width: 10
    //             //     }
    //             // }
            
    //         }
    //     });
    // }



    useEffect(()=>{
        setgraph({
            nodes:[
                {id:"1",name:"1",symbolSize: 10},
                {id:"2",name:"2",symbolSize: 10}
            ],
            links:[{source:"1",target:"2"}]
        })
    },[])
    


    return (
        <Segment>
            <Grid>
                <Grid.Column width={14}>
                    <ReactECharts style={{height:500}}
                        option={{
                            timeline:{
                                axisType: 'category',
                                orient: 'vertical',
                                autoPlay: false,
                                inverse: true,
                                playInterval: 1000,
                                left: null,
                                right: 0,
                                top: 20,
                                bottom: 20,
                                width: 55,
                                height: null,
                                symbol: 'none',
                                checkpointStyle: {
                                    borderWidth: 2
                                },
                                controlStyle: {
                                    showNextBtn: false,
                                    showPrevBtn: false
                                },
                                data: timeline
                            },
                            series: [
                                {
                                    name: 'Researcher',
                                    type: 'graph',
                                    layout: 'force',
                                    data: graph.nodes,
                                    links: graph.links,
                                    //categories: graph.categories,
                                    roam: true,
                                    label: {
                                        position: 'right',
                                        formatter: '{b}'
                                    },
                                    lineStyle: {
                                        color: 'red',
                                        curveness: 0.3
                                    },
                                    // emphasis: {
                                    //     focus: 'adjacency',
                                    //     lineStyle: {
                                    //         width: 10
                                    //     }
                                    // }
                                }
                            ],
                            options: option_custom
                        }}
                   
                />
                </Grid.Column>
                <Grid.Column width={2}>
                    
                </Grid.Column>
            </Grid>
        </Segment>
        
    )
}

export default Impact_cmp_new