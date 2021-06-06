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

    console.log(gen_data)

    return (
        <Segment>
            <ReactECharts style={{height:500}}
                option={
                    {
                        series: [{
                            name : 'Funders',
                            type: 'treemap',
                            visibleMin: 300,
                            label: {
                                show: true,
                                formatter: '{b}'
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
                            // data: [{
                            //     name: 'nodeA',            // First tree
                            //     value: 10,
                            //     children: [{
                            //         name: 'nodeAa',       // First leaf of first tree
                            //         value: 4
                            //     }, {
                            //         name: 'nodeAb',       // Second leaf of first tree
                            //         value: 6
                            //     }]
                            // }, {
                            //     name: 'nodeB',            // Second tree
                            //     value: 20,
                            //     children: [{
                            //         name: 'nodeBa',       // Son of first tree
                            //         value: 20,
                            //         children: [{
                            //             name: 'nodeBa1',  // Granson of first tree
                            //             value: 20
                            //         }]
                            //     }]
                            // }]
                        }]
                    }
                }
            />

        </Segment>
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