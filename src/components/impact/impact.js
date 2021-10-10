import React, { useState, useEffect } from 'react';
import { Segment, Grid } from "semantic-ui-react"
import ReactECharts from 'echarts-for-react';
import * as d3 from "d3";
import 'rc-slider/assets/index.css';

const Impact = ({data}) => {

    const [graph,setgraph] = useState({nodes:[],links:[],categories:[]})
    const data_ByYear = d3.group(data, d => parseInt(d.Year))
    const timeline = [...data_ByYear.keys()].sort()

    const link_calc = (author_list,content) =>{
        const authors = author_list.filter(d => d != 'Bilal Khan')
        let links = []
        if(authors.length>1){
            for (let i = 0; i < authors.length; i++) {
                for (let j = i+1; j < authors.length; j++) {
                    links.push(
                        {source:authors[i] ,target:authors[j] , content:content}
                    )
                } 
            }
        }
        return links
    }

    const grap_calc = (year) => {
        let nodes = [], tmp_nodes = []
        let links = []
        data.forEach(e => {
            if(e.Year <= year){
                const authors_list = e.Authors.split('#').map(Function.prototype.call, String.prototype.trim)
                links = links.concat(link_calc(authors_list,e))
            }
        });
        links.forEach(e => {
            tmp_nodes.push(e.source)
            tmp_nodes.push(e.target)
        });

        const tmp_nodes1 = [...new Set(tmp_nodes)]
        tmp_nodes1.forEach(e => {
            nodes.push({id:e,name:e,symbolSize: 10})
        }); 

        return {nodes:nodes,links:links}
    }

    let option_custom = []
    let timeline_data_custom = []

    for (var n = 0; n < timeline.length; n++) {
        timeline_data_custom.push(timeline[n]);
        const grp = grap_calc(timeline[n])
        option_custom.push({
            title: {
                show: true,
                'text': "Prof.Bilal Khan's research Co-Author Network from 1998 to " + timeline[n] + ''
            },
            series: [
                {
                    name: 'yr'+timeline[n],
                    type: 'graph',
                    layout: 'force',
                    data: grp.nodes,
                    links: grp.links,
                    roam: true,
                    label: {
                        position: 'right',
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: '#1E1D1C',
                        curveness: 0.3
                    },
                    itemStyle: {
                        color: '#4169E1'
                    }
                },
                {
                    name: 'yr1'+timeline[n],
                    type: 'graph',
                    layout: 'circular',
                    data: grp.nodes,
                    links: grp.links,
                    roam: true,
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    },
                    circular: {
                        rotateLabel: true
                    },
                    lineStyle: {
                        color: '#1E1D1C',
                        curveness: 0.3
                    },
                    itemStyle: {
                        color: '#4169E1'
                    }
                }
            ],
        });
    }

    useEffect(()=>{
        setgraph({
            nodes:[],
            links:[]
        })
    },[])

    return (
        <Segment>
            <Grid>
                <Grid.Column width={15}>
                    <ReactECharts style={{height:700}}
                        option={{
                            timeline:{
                                axisType: 'category',
                                orient: 'vertical',
                                autoPlay: true,
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
                            tooltip: {
                                formatter: function (e) {
                                    if(e.dataType == 'node'){
                                        return `${e.data.name} `;
                                    }else if(e.dataType == 'edge'){
                                        return (
                                            `${e.data.source} and ${e.data.target}<br />
                                            ${e.data.content.Title}<br />
                                            ${e.data.content.Year}
                                            `
                                        )
                                        ;
                                    }
                                    console.log(e)
                                }
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
                                    center: [300,400],
                                    height: 400,
                                    width: 400,
                                    label: {
                                        position: 'right',
                                        formatter: '{b}'
                                    },
                                    lineStyle: {
                                        color: 'red',
                                        curveness: 0.3
                                    },
                                    emphasis: {
                                        focus: 'adjacency',
                                        lineStyle: {
                                            width: 10
                                        }
                                    }
                                },
                                {
                                    name: 'Researcher1',
                                    type: 'graph',
                                    layout: 'circular',
                                    circular: {
                                        rotateLabel: true
                                    },
                                    data: graph.nodes,
                                    center: [750,350],
                                    height: 300,
                                    width: 300,
                                    roam: true,
                                    label: {
                                        position: 'right',
                                        formatter: '{b}'
                                    },
                                    lineStyle: {
                                        color: 'source',
                                        curveness: 0.3
                                    }
                                }
                            ],
                            options: option_custom
                        }}
                   
                />
                </Grid.Column>
                <Grid.Column width={1}> 
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default Impact