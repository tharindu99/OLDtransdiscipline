import React, { useState } from 'react';
import * as d3 from "d3";
import { Segment,Label } from "semantic-ui-react"
import Publication_list from './publication_list'


const Publication_cmp = ({data}) =>{
    // const groupByYear = groupBy('Year');
    // const publication_groupby_year = groupByYear(data)
    const publication_groupby_year = Array.from (new Map([...d3.group(data, d => d.Year).entries()].sort()))
   
    return(
        <Segment>
            <Publication_list data={publication_groupby_year.reverse()}></Publication_list>
        </Segment>
    )
}


export default Publication_cmp

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});