import React from 'react';
import * as d3 from "d3";
import { Segment,Label } from "semantic-ui-react"
import Publication_list from './publication_list'

const Publication_cmp = ({data}) =>{
    const publication_groupby_year = Array.from (new Map([...d3.group(data, d => d.Year).entries()].sort()))
    return(
        <Segment>
            <Publication_list data={publication_groupby_year.reverse()}></Publication_list>
        </Segment>
    )
}

export default Publication_cmp