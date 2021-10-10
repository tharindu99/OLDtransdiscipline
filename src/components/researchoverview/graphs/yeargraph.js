import React, { useState, useEffect  } from 'react';
import ReactECharts from 'echarts-for-react';
import * as d3 from 'd3';

const YearGraph = ({data,Year_callBack}) => {

    const YearGraph_clac = (M_data) => {
        const groupByYear = new Map([...d3.group(M_data, d=> d.Year).entries()].sort())
        const Data_year = Array.from(groupByYear.keys())
        const Data_pubCount = Array.from(groupByYear.values()).map(d => d.length)
        return {
            xData: Data_year,
            yData: Data_pubCount
        }
    }

    const graph_data = YearGraph_clac(data)

    const DEFAULT_OPTION = {
        tooltip: {
        },
        xAxis: {
        type: 'category',
        data: graph_data.xData
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: graph_data.yData,
                type: 'bar',
                selectedMode: 'multiple'
            }
        ]
    }

    const [option, setOption] = useState(DEFAULT_OPTION);

    const Main_dataProcessor = (Usedata) =>{
        const Mgraph_data = YearGraph_clac(Usedata)
        DEFAULT_OPTION.xAxis.data = Mgraph_data.xData
        DEFAULT_OPTION.series[0].data = Mgraph_data.yData
        setOption(DEFAULT_OPTION)
    }

    useEffect(()=>{
       // console.log(data)
        Main_dataProcessor(data)
    },[data])

    const MainData_YearFilter = (years) =>{
        if(years.length > 0){
            return data.filter(d=> years.indexOf(d.Year) > -1)
        }else{
            return data
        }
    }

    const onChartClick = (d) => {
        let selectedYr = []
        if(d.selected.length > 0){
            const [selectedIndex] = d.selected.map(d => d.dataIndex)
            selectedYr = selectedIndex.map(d =>graph_data.xData[d])
        }
        const FilteredData = MainData_YearFilter(selectedYr)
        Year_callBack(FilteredData)
    }

    return (
        <ReactECharts 
            style={{height:275}} 
            option={option}
            onEvents={{
                'selectchanged': onChartClick
                //'dataZoom': this.onDataZoom,
            }}
        />
        
    )
}

export default YearGraph