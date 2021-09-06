import React, { useState,useEffect } from 'react';
import * as d3 from 'd3';
import * as dc from 'dc';
import { Segment, Grid, Header, Button, Icon } from 'semantic-ui-react';
import stringHash  from 'string-hash';
import './style.css'

import { NumberDisplay, BarChart, SunburstChart, RowChart, DataTable } from 'react-dc-js';
import crossfilter from 'crossfilter2';

const ResearchOverview_cmp = ({data}) =>{ 

    let subject_list_tmp = []

    const AuthorString = (e,noKhan) =>{
        const co_authors = e.replace(/\b(?:Bilal Khan|Bilal Khan | Bilal Khan|Bilal Khan # |# Bilal Khan)\b/,"Bilal Khan")
        if(noKhan){
            const co_authors_list = co_authors.split('#') //.map(e => e.trim());
            const co_author_trimed = co_authors_list.map(e => e)
            const co_author_filtered = co_author_trimed.filter(d => d !=="").sort()
            return co_author_filtered.join('#')

        }else{
            const co_authors_removeKhan = co_authors.replaceAll("Bilal Khan", "")
            const co_authors_list = co_authors_removeKhan.split('#').map(e => e.trim());
            const co_author_filtered = co_authors_list.filter(d => d !=="").sort()
            return co_author_filtered.join('#')
        }
        
    }

    data.forEach(d => {
        d.Year = parseInt(d.Year)
        //d.Authors = d.Authors.replace(/\b(?:Bilal Khan|Bilal Khan # |# Bilal Khan)\b/,"")
        d.co_authors =  AuthorString(String(d.Authors),true)
        
    });

    //const data_noKhan = data.filter(d => d.co_authors !== "")

    

    

    // data_noKhan.forEach(element => {
    //     console.log(element.Subject)
    // });
   

    const Colors = (a) =>{
        
        
        let colorNumber
        if(typeof a === 'object' && a.length > 0){
            const e = a[a.length-1].trim()
            
            // legend values
            colorNumber = stringHash(e)
        }else{
            const e = a.trim()
           
            colorNumber = stringHash(e)
        }
        const Setcolors =  d3.scaleQuantize()
                            .domain([0,4300000000])
                            .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99","#b15928"]);
                            // .range(["#5E4FA2", "#3288BD", "#66C2A5", "#ABDDA4", "#E6F598", 
                            // "#FFFFBF", "#FEE08B", "#FDAE61", "#F46D43", "#D53E4F", "#9E0142"]);

       
        return Setcolors(colorNumber)
    } 

    const cx = crossfilter(data)
    const dimensionYear = cx.dimension(d => d.Year)
    const groupYear = dimensionYear.group().reduceCount(function(d) {return d;});

    const dimensionPublications = cx.dimension(d => d.ID)
    const groupPublications = dimensionPublications.group()

    const dimensionSubject = cx.dimension(d => d.Subject.split("#"))
    const groupSubject = dimensionSubject.group()

    const dimensionCoAuthor = cx.dimension(d =>{ return d.co_authors.split("#")})
    const groupCoAuthor = dimensionCoAuthor.group();

    const resetClicked = () => {
        dc.filterAll()
        dc.renderAll()
    }

    function legend_modifier(id,con){
        let pos = 0
        d3.select(id).selectAll('.dc-legend-item').each((d,i,nodes) => {
            if(d.name.length>con){
                nodes[i].remove()
            }else{
                d3.select(nodes[i]).attr("transform",d3.select(nodes[pos]).attr("transform"))
                pos = pos +1
            }
            
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            legend_modifier('#subject_area',1)
            legend_modifier('#co_author',2)
        },10);
    })

    
    
    return (
        <Segment>
            <Grid columns='equal'>
                <Grid.Row >
                    <Grid.Column width={6} textAlign='center'>
                        <Header as='h4' >Subject areas</Header>
                        <div id="subject_area">
                        <SunburstChart
                            dimension={dimensionSubject} 
                            group={groupSubject} 
                            innerRadius={75}
                            legend={dc.legend().x(0).y(0).itemHeight(10)}
                            
                            renderLabel={false}
                            colors={function(d){  return Colors(d)}}
                           // width={350}
                            height={400}
                            //colorAccessor ={ d => { return d.key}}
                            valueAccessor = {function(d) { return d.value; }}
                        />  
                        </div>
                    </Grid.Column>
                    <Grid.Column width={7} textAlign='center'>
                        <Header as='h4' >Co Authors</Header>
                            <div id="co_author">
                            <SunburstChart 
                                dimension={dimensionCoAuthor} 
                                group={groupCoAuthor} 
                                innerRadius={40}
                                legend={dc.legend().x(0).y(0)}
                                cap={10}
                                //colors={function(d){ return Colors(d)}}
                               // Radius={100}
                                renderLabel={false}
                               // width={300}
                                height={400}
                            />
                            </div>
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