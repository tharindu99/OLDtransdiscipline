import React, { useState } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import { Segment, Grid, Header } from 'semantic-ui-react';

import { PieChart, BarChart, SunburstChart, RowChart, DataTable } from 'react-dc-js';
import crossfilter from 'crossfilter2';

const ResearchOverview_cmp = ({data}) =>{


    console.log(data)

    const cx = crossfilter(data)
    const dimensionYear = cx.dimension(d => d.Year)
    const groupYear = dimensionYear.group().reduceCount(function(d) {return d;});

    const dimensionSubject = cx.dimension(d => d.Subject.split(","))
    const groupSubject = dimensionSubject.group()

    const dimensionAuthor = cx.dimension(d => d.Authors.split('and'))
    const groupAuthor = dimensionAuthor.group();

    
    return (
        <Segment>
            <Grid columns='equal'>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Header as='h5' icon textAlign='center'>Research contributions</Header>
                        <BarChart 
                            dimension={dimensionYear} 
                            group={groupYear}
                            x={d3.scaleLinear().domain([1997,2021])}
                            xUnits={dc.units.integers}
                            title={"Yearly"}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                    <Grid.Column width={10}>
                        <Header as='h5' icon textAlign='center'>Subject areas</Header>
                        <RowChart 
                            dimension={dimensionSubject}
                            group={groupSubject}
                            elasticX={true}
                        />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Header as='h5' icon textAlign='center'>Co Authors</Header>
                        <SunburstChart 
                            dimension={dimensionAuthor} 
                            group={groupAuthor} 
                            innerRadius={30}
                        // legend={dc.legend()}
                            renderLabel={false}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row stretched>
                    <Grid.Column>
                        <DataTable 
                            dimension={dimensionSubject} 
                            columns={
                                [
                                    function (d) { return (
                                        d.ID+". "+ d.Authors+" "+d.Title+" "+d.Publication+" "+d.Publisher+" "+d.Year
                                    )}
                                ]
                            }
                        />
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