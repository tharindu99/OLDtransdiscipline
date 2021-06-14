import React, { useState } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import { Segment, Grid, Header, Button, Icon } from 'semantic-ui-react';
import './style.css'

import { NumberDisplay, BarChart, SunburstChart, RowChart, DataTable } from 'react-dc-js';
import crossfilter from 'crossfilter2';

const ResearchOverview_cmp = ({data}) =>{

    console.log(data)

    data.forEach(d => {
        //d.Year = new Date(d.Year)
        d.Year = parseInt(d.Year)
    });

    const cx = crossfilter(data)
    const dimensionYear = cx.dimension(d => d.Year)
    const groupYear = dimensionYear.group().reduceCount(function(d) {return d;});

    const dimensionPublications = cx.dimension(d => d.ID)
    const groupPublications = dimensionPublications.group()

    const dimensionSubject = cx.dimension(d => d.Subject.split("#"))
    const groupSubject = dimensionSubject.group()

    const dimensionAuthor = cx.dimension(d => d.Authors.split('#'))
    const groupAuthor = dimensionAuthor.group();

    const resetClicked = () => {
        dc.filterAll()
        dc.renderAll()
    }
    
    return (
        <Segment>
            <Grid columns='equal'>
                <Grid.Row >
                    <Grid.Column width={8} textAlign='center'>
                        <Header as='h4' >Subject areas</Header>
                        <SunburstChart 
                            dimension={dimensionSubject} 
                            group={groupSubject} 
                            innerRadius={75}
                            legend={dc.legend().x(0).y(0)}
                            renderLabel={false}
                           // width={350}
                            height={400}
                        />  
                    </Grid.Column>
                    <Grid.Column width={7} textAlign='center'>
                        <Header as='h4' >Co Authors</Header>
                            <SunburstChart 
                                dimension={dimensionAuthor} 
                                group={groupAuthor} 
                                innerRadius={40}
                               // Radius={100}
                              // legend={dc.legend()}
                                renderLabel={false}
                               // width={300}
                                height={400}
                            />
                    </Grid.Column>
                    <Grid.Column width={1} textAlign='center'>
                        <Button icon onClick={resetClicked}>
                            <Icon name='redo' />
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
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
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                    <Grid.Column>
                        <table>
                    <thead>
                        <tr>
                            <th>Publication</th>
                        </tr>
                    </thead>
                        <DataTable 
                            dimension={dimensionYear} 
                            columns={
                                [
                                    // function (d) { return (
                                    //     d.ID+". "+ d.Authors+" "+d.Title+" "+d.Publication+" "+d.Publisher+" "+d.Year
                                    // )},
                                    function (d) { return (
                                        d.Year
                                    )},
                                    function (d) { return (
                                        d.Authors.replaceAll('# ',',')+'. '+d.Title+', '+d.Publication+', '+ (d.Publisher == 'NULL'? '':d.Publisher)
                                    )}
                                ]
                            }
                            sortBy ={function (d) { return d.Year }}
                            order = {(d3.descending)}
                            size={150}
                        />
                        </table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
             
            
            {/* <SunburstChart 
                dimension={dimensionAuthor} 
                group={groupAuthor} 
                legend={dc.legend()}
                radius={200}
                innerRadius={30}
                renderLabel={false}
                
            /> */}
           
        </Segment>
    )
}

export default ResearchOverview_cmp