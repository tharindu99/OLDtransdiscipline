import React, { useState } from 'react';
import { Segment } from "semantic-ui-react"
import ReactECharts from 'echarts-for-react';

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

const Impact_cmp = ({data}) => {

    let Authors = []
    let categories = [
        {
            "name": "Bilal Khan"
          },
          {
            "name": "Co-Authors"
          }
    ]
    

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
    let nodes = Authors.map((d,i) => {
        if(d == 'Bilal Khan '){
            return{
                id:d,
                name:d,
                category: 0,
                "symbolSize": 20,
            }
        }else{
            return {
                id:d,
                name:d,
                category: 1,
                "symbolSize": 10,
            }
        }
    }) 

    data.forEach(d => {
        finder_auth_id(d,links)
    })

    

    
    

    console.log(nodes)
    console.log(links)
    return (
        <Segment>
            <ReactECharts style={{height:500}}
                option={
                    
                    {
                        tooltip: {},
                        legend: [{
                            data: categories.map(function (a) {
                                return a.name;
                            })
                        }],
                        series: [
                            {
                            name: 'Les Miserables',
                            type: 'graph',
                            layout: 'force',
                            data: nodes,
                            links: links,
                            categories: categories,
                            roam: true,
                            label: {
                                position: 'right'
                            },
                            force: {
                                repulsion: 100
                            }
                            }
                        ]
                    }
                }
               
            />

        </Segment>
    )
}

export default Impact_cmp