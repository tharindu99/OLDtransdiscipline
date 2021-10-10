import { Link } from 'gatsby';
import React, { useState } from 'react';
import { Item, Label,Header,Icon} from "semantic-ui-react"



const Publication_list = ({data}) =>{

    const pub_list = data.map(d => { 
        return (
            <div key={d[0]} >
            <Label as='a' color='red' ribbon>{d[0]}</Label>
            <Item.Group divided>
                {d[1].map(pub => {
                    return (
                    <Item key={pub.Counter}>
                        <Item.Content>
                            <Item.Header>{pub.Title}</Item.Header>
                            <Item.Meta>
                                <span className='author'>{pub.Authors}</span>
                            </Item.Meta>
                            <Item.Meta>
                            <span className='subject'>
                                <Header as='h5'>{pub.Subject}</Header></span>
                            </Item.Meta>
                            
                            <Item.Description>
                                <Label><Icon name='quote left' />Citations {pub.Citation}</Label>
                                <Label>
                                    <a href={pub.GoogleScholarURL} target="_blank">
                                        <Icon name='google' />Google scholar
                                    </a>
                                </Label>
                                <Label>
                                    <Link to='#'> 
                                        <Icon name='file pdf' />Download 
                                    </Link>
                                </Label>
                                <p>{pub.Publication}, {pub.Publisher}</p>
                            </Item.Description>
                            <br />
                        </Item.Content>
                    </Item>
                    )
                })}
                
            </Item.Group>
            </div>
        )
    })

    return(
       <>
       {pub_list}
       </>
    )
}

export default Publication_list