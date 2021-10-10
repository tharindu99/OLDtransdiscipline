import React, { useEffect, useState  } from 'react';
import ReactECharts from 'echarts-for-react';
import * as d3 from 'd3';

const SubjectGraph = ({data,Subject_callBack}) => {
    const SubjectGraph_clac = (M_data) => {
        let all_combinations = []
        M_data.forEach(e => {
            const subjects = e.Subject[0].split(',')
            subjects.forEach(d => {
                e.M_subject = d
                all_combinations.push(e)
            });
        });
        const groupBySubject = new Map([...d3.group(all_combinations, d=> d.M_subject).entries()].sort())
        const result = []
        groupBySubject.forEach((value,key) => {
            result.push({
                name:key,
                value: value.length
            })
        })
        return result
    }

    let DEFAULT_OPTION = {
        tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: 'Subject',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: SubjectGraph_clac(data)
            }
          ]
    }
    const [option, setOption] = useState(DEFAULT_OPTION);

    const Main_dataProcessor = (Usedata) =>{
        const graphData = SubjectGraph_clac(Usedata)
        DEFAULT_OPTION.series[0].data = graphData
        setOption(DEFAULT_OPTION)
        
    }

    useEffect(()=>{
        Main_dataProcessor(data)
    },[data])

    const MainData_SubjectFilter = (subjects) => {
        if(subjects.length === 0){
            return []
        }else{
            return data.filter(d=> d.Subject.some(a1 => subjects.includes(a1)))
        }
    }

    const legendClick = (d) => {
        const selected = d.selected
        let selected_subjects = []
        for(let key in selected){
            if(selected[key]) selected_subjects.push(key)
        }
        const FilteredData = MainData_SubjectFilter(selected_subjects)
        Subject_callBack(FilteredData)
    }

    return (
        <ReactECharts 
            style={{height:375}} 
            option={option} 
            lazyUpdate={true}
            onEvents={{
                'legendselectchanged': legendClick
                //'dataZoom': this.onDataZoom,
            }}
        />
    );
};

export default SubjectGraph;