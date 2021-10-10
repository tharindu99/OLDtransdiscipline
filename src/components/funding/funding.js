import React from 'react'
import { Segment } from 'semantic-ui-react'
import ReactECharts from 'echarts-for-react';
import * as d3 from 'd3';

const Funding_cmp = ({data}) => {

    data.forEach(d =>{
        d.Amount = parseFloat(d.Amount)
    })

    function childData_process(data_arr, dim){
        const data1 = Array.from(d3.group(data_arr, d => d[dim]), ([key, value]) => ({ key, value })) 
        data1.forEach(d => {
            d.name = d.key
            d.value = d.value.reduce((accumulator, current) => accumulator + current.Amount, 0)
        })
        return data1
    }

    const groupBy_funder =  Array.from(d3.group(data, d => d.funder_shortname), ([key, value]) => ({ key, value })) 

    const gen_data = groupBy_funder.map(d1 => {
        return{
            name:d1.key,
            value: d1.value.reduce((accumulator, current) => accumulator + current.Amount, 0),
            children: childData_process(d1.value,'Category')
        }
    })

    let Sankey_Links = []

    data.forEach(d => {
        Sankey_Links.push({
            source: d.funder_shortname,
            target: d.YearStart,
            value : d.Amount
        })
        Sankey_Links.push({
            source: d.YearStart,
            target: d.YearEnd,
            value : d.Amount
        })
        Sankey_Links.push({
            source: d.YearEnd,
            target: d.Category,
            value : d.Amount
        })
        Sankey_Links.push({
            source: d.Category,
            target: d.Title,
            value : d.Amount
        })
    });

    const tmp_nodes = Sankey_Links.map(d => d.source).concat(Sankey_Links.map(d => d.target))
    const noDup_nodes = [...new Set(tmp_nodes)]
    const Sankey_nodes = noDup_nodes.map(d=>{
        return{
            name:d
        }
    })

    return (
        <>
        <Segment>
            <ReactECharts style={{height:800}}
                    option={
                        {
                            tooltip: {
                                trigger: 'item',
                                triggerOn: 'mousemove',
                                formatter: function (e) {
                                    return  e.name+ ' : Funds $'+e.value.toFixed(2)+'M'
                                }
                            },
                            series: {
                                type: 'sankey',
                                layout: 'none',
                                emphasis: {
                                    focus: 'adjacency'
                                },
                                data: Sankey_nodes,
                                links: Sankey_Links
                            }
                        }
                    }
            />
        </Segment>
        {/* <Segment>
            <ReactECharts style={{height:500}}
                option={
                    {
                        series: [{
                            name : 'Funders',
                            type: 'treemap',
                            visibleMin: 300,
                            label: {
                                normal: {
                                    position: 'insideTopLeft',
                                    formatter: function (params) {
                                        var arr = [
                                            params.name,
                                            'Fund $'+params.value+'M'
                                        ];
                                        return (
                                            params.name + ' Found: $'+params.value+'M'
                                        )         
                                    }
                                }
                            },
                            upperLabel: {
                                show: true,
                                height: 30
                            },
                            itemStyle: {
                                borderColor: '#fff'
                            },
                            levels: getLevelOption(),
                            data: gen_data
                            
                        }]
                    }
                }
            />

        </Segment> */}
        </>
    )
}

function getLevelOption() {
    return [
        {
            itemStyle: {
                borderColor: '#777',
                borderWidth: 0,
                gapWidth: 1
            },
            upperLabel: {
                show: false
            }
        },
        {
            itemStyle: {
                borderColor: '#555',
                borderWidth: 5,
                gapWidth: 1
            },
            emphasis: {
                itemStyle: {
                    borderColor: '#ddd'
                }
            }
        },
        {
            colorSaturation: [0.35, 0.5],
            itemStyle: {
                borderWidth: 5,
                gapWidth: 1,
                borderColorSaturation: 0.6
            }
        }
    ];
}

export default Funding_cmp