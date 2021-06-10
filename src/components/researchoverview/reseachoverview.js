import React, { useState } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import { Segment, Grid, Header, Button, Icon } from 'semantic-ui-react';
import './style.css'

import { NumberDisplay, BarChart, SunburstChart, RowChart, DataTable } from 'react-dc-js';
import crossfilter from 'crossfilter2';

const ResearchOverview_cmp = ({data}) =>{

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
                            innerRadius={50}
                            legend={dc.legend().x(0).y(170)}
                            renderLabel={false}
                            width={350}
                            height={300}
                        />  
                    </Grid.Column>
                    <Grid.Column width={7} textAlign='center'>
                        <Header as='h4' >Co Authors</Header>
                            <SunburstChart 
                                dimension={dimensionAuthor} 
                                group={groupAuthor} 
                                innerRadius={30}
                                Radius={400}
                              // legend={dc.legend()}
                                renderLabel={false}
                                width={300}
                                height={300}
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
                            x={d3.scaleLinear().domain([1997,2021])}
                           // xUnits={dc.units.integers}
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