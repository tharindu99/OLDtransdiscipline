import React, { useState, useEffect  } from 'react';
import ReactECharts from 'echarts-for-react';
import {Header } from 'semantic-ui-react';
import * as d3 from 'd3';

const CoAuthorsGraph = ({data,CoAuthors_callBack}) => {

    const TOP = 40 
    const TOP_selector = (arr) =>{
        return (arr.length > TOP)? arr.slice(-1*TOP):arr
    }

    const CoAuthorsGraph_clac = (M_data) => {
        let all_authors = new Map()
        M_data.forEach(e => {
            const author = e.co_authors
            const authInc = (el) => {
                return (typeof all_authors.get(el) != 'undefined')? all_authors.get(el)+1 : 1
            }
            author.forEach(d => {
                all_authors.set(d,authInc(d))
            });
        });
        all_authors.delete('Bilal Khan')

        const result = new Map([...all_authors.entries()].sort((a, b) => a[1] - b[1]));
        const Data_Co_authors = TOP_selector(Array.from(result.keys()))
        const Data_pubCount = TOP_selector(Array.from(result.values()))
        return {
            xData: Data_pubCount,
            yData: Data_Co_authors
        }
    }

    const graph_data = CoAuthorsGraph_clac(data)

    const DEFAULT_OPTION = {
        tooltip: {
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: graph_data.yData,
        },
        series: [
            {
                data: graph_data.xData,
                type: 'bar',
                selectedMode: 'multiple'
            }
        ]
    }

    const [option, setOption] = useState(DEFAULT_OPTION);

    const Main_dataProcessor = (Usedata) =>{
        const Mgraph_data = CoAuthorsGraph_clac(Usedata)
        DEFAULT_OPTION.yAxis.data = Mgraph_data.yData
        DEFAULT_OPTION.series[0].data = Mgraph_data.xData
        setOption(DEFAULT_OPTION)
    }

    useEffect(()=>{
        Main_dataProcessor(data)
     },[data])

    const MainData_CoAuthorsFilter = (co_authors) =>{
        console.log(co_authors,data)
        if(co_authors.length === 0){
            return data
        }else{
            return data.filter(d=> d.co_authors.some(a1 => co_authors.includes(a1)))
        }
    }

    const onChartClick = (d) => {
        let selectedCo_author = []
        if(d.selected.length > 0){
            const [selectedIndex] = d.selected.map(d => d.dataIndex)
            selectedCo_author = selectedIndex.map(d =>graph_data.yData[d])
        }
        
        const FilteredData = MainData_CoAuthorsFilter(selectedCo_author)
        console.log(selectedCo_author)
        CoAuthors_callBack(FilteredData)
    }

    return (
        <>
            <Header as='h4' >Top Co Authors </Header>
            <ReactECharts 
                style={{height:800}} 
                option={option}
                onEvents={{
                    'selectchanged': onChartClick
                    //'dataZoom': this.onDataZoom,
                }}
            />
        </>
        
    )
}

export default CoAuthorsGraph