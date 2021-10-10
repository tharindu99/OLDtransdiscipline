import React, { useState,useEffect } from 'react';
import * as d3 from 'd3';
import { Segment, Grid, Header, Loader, Label } from 'semantic-ui-react';
import ReactECharts from 'echarts-for-react';


const ResearchOverview_cmp = ({data}) =>{ 

    const [Data, SetData] = useState([])

    data.forEach(d => {
        d.Year = parseInt(d.Year)
        d.Subject = String(d.Subject).split("#").map(d=> d.trim())
        d.co_authors =  String(d.Authors).split("#").map(d=> d.trim())
    });

    useEffect(()=>{
        
       console.log(YearGraph(data))

    },[])

    const YearGraph = (M_data) => {
        const groupByYear = new Map([...d3.group(M_data, d=> d.Year).entries()].sort()) 
        const Data_year = Array.from(groupByYear.keys())
        const Data_pubCount = Array.from(groupByYear.values()).map(d => d.length)

        return {
            xAxisData: Data_year,
            yAxisData: Data_pubCount
        }
    }

    return (
        <> 
        <Segment>
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column width={8}>
                        <Segment>
                            <Header as='h4' >Co Authors</Header>
                            
                            
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Segment>
                        <Header as='h4' >Subject areas</Header>
                            
                        </Segment>
                        <Segment>
                            <Header as='h4' icon textAlign='center'>Research Contributions (Yearly)</Header>
                            <ReactECharts style={{height:275}} 
                                option={{
                                    xAxis: {
                                      type: 'category',
                                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                                    },
                                    yAxis: {
                                      type: 'value'
                                    },
                                    series: [
                                      {
                                        data: [120, 200, 150, 80, 70, 110, 130],
                                        type: 'bar'
                                      }
                                    ]
                                  }}
                                />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                {/* <Grid.Row stretched>
                    <Grid.Column width={16}>
                        <table class="ui definition table">
                            <thead>
                                <tr>
                                    <th><h3 class="ui center aligned header">Publications</h3></th>
                                </tr>
                            </thead>
                            <DataTable
                                dimension={dimensionID}
                                columns={
                                    [
                                        // function (d) { return (
                                        //     d.Year
                                        // )},
                                        function (d) { return (
                                            d.Authors.replaceAll('# ',',')+'. '
                                            +d.Title+', '+d.Publication+', '
                                            + (d.Publisher == 'NULL'? '':d.Publisher)+ ', '+d.Year
                                        )}
                                    ]
                                }
                                sortBy ={function (d) { return d.Year }}
                                order = {(d3.descending)}
                                size={150}
                            />

                        </table>
                        
                    </Grid.Column>
                </Grid.Row>  */}
            </Grid>
        </Segment>
        }
        </>
    )
}

export default ResearchOverview_cmp