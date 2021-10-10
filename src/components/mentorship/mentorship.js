import React, { useState} from 'react';
import { useStaticQuery, graphql } from "gatsby"
import { Segment, Card, Header, Icon, Divider } from 'semantic-ui-react';
import default_img from '../../images/students/default.png'

const Mentorship = ({data}) => {

const allImagesQuery = graphql`
    query {
        allFile(
            filter: {extension: {regex: "/(jpg)|(png)|(jpeg)/"}, relativeDirectory: {eq: "students"}}
          ) {
            edges {
              node {
                base
                name
                publicURL
              }
            }
          }
    }
  `
const {
    allFile: { edges: profile_images },
} = useStaticQuery(allImagesQuery)

const imagePathFinder = (name) => {
    const tmp = profile_images.filter(d=> d.node.base === name)
    const default_tmp = profile_images.filter(d => d.node.name === 'default')[0].node
    return (tmp.length === 0)? default_tmp.publicURL : tmp[0].node.publicURL
  }
  data.forEach(e => {
      e.imagePath = imagePathFinder(e.photo)
  });

    const phd_students = data.filter(d=> d.Degree === 'Ph.D.')
    const msc_students = data.filter(d=> d.Degree === 'M.Sc.')
    const bsc_students = data.filter(d=> d.Degree === 'B.Sc.')

    const students = (arr) => {
        console.log(arr)
        return (
            arr.map(s =>(
                <Card 
                    key= {s.id}
                    image= {s.imagePath}
                    header={s.Name+ ' ('+s.Degree+')'}
                    meta={(s.Current === 'NULL')?'':s.Current}
                    description={[
                        'Research: ',
                        s.Title,' ',
                        s.Institution,
                    ].join('')}
                    extra={s.Year}
                />
            ))
    )}

    return (
        <Segment>
            <Header as='h2' icon textAlign='center'>
                <Icon name='graduation cap' circular />
                <Divider horizontal>
                <Header as='h4'>
                    My Students
                </Header>
                </Divider>
            </Header>
            <Segment>
                <Header as='h3'>
                    <Icon name='graduation cap' />
                    <Header.Content>Ph.D</Header.Content>
                </Header>
                <Card.Group itemsPerRow={4}>
                    {students(phd_students)}
                </Card.Group>
            </Segment>
            <Segment>
                <Header as='h3'>
                    <Icon name='graduation cap' />
                    <Header.Content>M.Sc.</Header.Content>
                </Header>
                <Card.Group itemsPerRow={4}>
                    {students(msc_students)}
                </Card.Group>
            </Segment>
            <Segment>
                <Header as='h3'>
                    <Icon name='graduation cap' />
                    <Header.Content>B.Sc.</Header.Content>
                </Header>
                <Card.Group itemsPerRow={4}>
                    {students(bsc_students)}
                </Card.Group>
            </Segment>
           
        </Segment>
    )
}

export default Mentorship