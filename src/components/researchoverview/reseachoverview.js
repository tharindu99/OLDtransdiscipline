import React, { useState,useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import { Segment, Grid, Header, Button, Icon, Loader, Label, Table } from 'semantic-ui-react';
import stringHash  from 'string-hash';
import './style.css'
import { PieChart, BarChart, SunburstChart, RowChart, DataTable, DataCount } from 'react-dc-js';
import crossfilter from 'crossfilter2';
import { Constants } from 'tsparticles';
import DataTableNew from './datatable';
import { dataGrid } from 'dc';


const ResearchOverview_cmp = ({data}) =>{ 

    const [ loading, setLoading ] = useState(true);
    const [ Data, SetData] = useState([]);
    
    data.forEach(d => {
        d.Year = parseInt(d.Year)
        d.Subject = String(d.Subject).split("#").map(d=> d.trim())
        d.co_authors =  String(d.Authors).split("#").map(d=> d.trim())
    })

    useEffect (() => {
        let M_data = []
        data.forEach(d=>{
            const subject = d.Subject
            d.M_Subject = null
            if(Array.isArray(subject)){
                subject.forEach(e=>{
                    d.M_Subject = e
                    M_data.push(d)
                })
            }
            const co_authors = d.co_authors
            if(Array.isArray(co_authors)){
                co_authors.forEach(e=>{
                    d.M_co_authors = e
                    M_data.push(d)
                })
            }
        })

        const MM_data = M_data.filter(d=> d.M_co_authors.indexOf('Bilal Khan') === -1)

        SetData(MM_data)
        //console.log(M_data)
        setLoading(false)
        
    },[])

    const cx = crossfilter(Data)

    let Year_arr = {}
    const dimensionYear = cx.dimension(d => d.Year)
    const groupYear = dimensionYear.group()
        .reduce(
            function(p,v,nf){
                const yr = v.Year
                if(typeof Year_arr[yr] === 'undefined'){
                    Year_arr[yr]= [v.id]
                }else{
                    Year_arr[yr] =  [...new Set([...Year_arr[yr],...[v.id]])]   //Year_arr[yr].concat([v.id])
                }
                
                return Year_arr[yr].length
            },
            function(p,v,nf){
                const yr = v.Year

                if(typeof Year_arr[yr] === 'undefined'){
                    return p
                }else{
                    Year_arr[yr] = Year_arr[yr].filter(d=>d.id !== v.id)   //Year_arr[yr].concat([v.id])
                }
                
                return Year_arr[yr].length
            },
            function(p,v,nf){
                return 0
            }
        )

    const dimensionSubject = cx.dimension(d => d.M_Subject)
    const groupSubject = dimensionSubject.group()
        
    const dimensionID = cx.dimension(d => d.ID)
    const groupID = dimensionID.group()
    
    const dimensionCoAuthor = cx.dimension(d => d.M_co_authors)
    const groupCoAuthor = dimensionCoAuthor.group()

    const resetClicked = () => {
        dc.filterAll()
        dc.renderAll()
    }

    return (
        <> 
        {loading ? <Loader /> : 
        <Segment>
            <Label as='a' color='red' ribbon='right' onClick={resetClicked}>
                Reset
                {/* <Button icon onClick={resetClicked} floated='right'>
                    <Icon name='redo' />
                </Button> */}
            </Label>
            <Grid>
                <Grid.Row stretched>
                    <Grid.Column width={8}>
                        <Segment>
                            <Header as='h4' >Co Authors</Header>
                            <RowChart 
                                 dimension={dimensionCoAuthor}
                                 group={groupCoAuthor}
                                 height={650}
                                 elasticX={true}
                                 elasticX={true}
                                // labelOffsetX={-40}
                                 fixedBarHeight={12}
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Segment>
                        <Header as='h4' >Subject areas</Header>
                            <PieChart 
                                dimension={dimensionSubject}
                                group={groupSubject}
                                height={350}
                                innerRadius = {50}
                                legend={dc.legend().x(0).y(0).itemHeight(10)}
                            />
                        </Segment>
                        <Segment>
                            <Header as='h4' icon textAlign='center'>Research Contributions (Yearly)</Header>
                            <BarChart 
                                dimension={dimensionYear} 
                                group={groupYear}
                                //x={d3.scaleTime().domain([new Date("1998-01-01"), Date.now()]).nice()}
                                x={d3.scaleOrdinal().domain(d3.range(1998,2021,1))}
                                xUnits={dc.units.ordinal}
                                title={"Yearly"}
                                height={175}

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