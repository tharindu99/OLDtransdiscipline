import React, { useState } from 'react';
import { graphql } from 'gatsby'
import { Container, Header, Menu, Segment} from 'semantic-ui-react'
import About_cmp from '../components/about/about';

import Background_cmp from '../components/background'
import Publication_cmp from '../components/publication/publication';
import ResearchOverview_cmp from '../components/researchoverview/reseachoverview';

const pageStyles = {
  
}
const style = {
  h1: {
    marginTop: '1rem',
  }
}


const IndexPage = ({data}) => {

  const [activeItem, setActiveItem] = useState('About');

  const handleMenuClick = (e,{name}) => {
    setActiveItem(name)
  }

  const Active_content = () => {
    switch(activeItem) {
      case 'About':
        return <About_cmp></About_cmp>
      case 'Publication':
        return <Publication_cmp data={data.allPublicationCsv.nodes}></Publication_cmp>
      case 'Research Overview':
        return <ResearchOverview_cmp data={data.allPublicationCsv.nodes}></ResearchOverview_cmp>
      default:
        return <Segment>Under constructions</Segment>
    }
  }
    

  return (
    <>
    <Header as='h1' content='Bilal Khan' style={style.h1} textAlign='center'/>
      <Container style={{ padding: '0em 10em 10px' }}>
        <Menu pointing>
            <Menu.Item
              name='About'
              active={activeItem === 'About'}
              onClick={handleMenuClick}
            />
            <Menu.Item
              name='Publication'
              active={activeItem === 'Publication'}
              onClick={handleMenuClick}
            />
            <Menu.Item
              name='Research Overview'
              active={activeItem === 'Research Overview'}
              onClick={handleMenuClick}
            />
            <Menu.Item
              name='Code'
              active={activeItem === 'Code'}
              onClick={handleMenuClick}
            />
            <Menu.Item
              name='Funding'
              active={activeItem === 'Funding'}
              onClick={handleMenuClick}
            />
            <Menu.Item
              name='Mentorship'
              active={activeItem === 'Mentorship'}
              onClick={handleMenuClick}
            />
           <Menu.Item
              name='Profile'
              active={activeItem === 'Profile'}
              onClick={handleMenuClick}
            />
          </Menu>
      </Container>
      <Background_cmp></Background_cmp>
      <Container style={{ padding: '0em 10em 10px' }}>
        <Active_content></Active_content>
      </Container>
      
     

      {/* <Container style={{ padding: '0em 10em' }}>
        <Segment>Content1</Segment>
      </Container> */}
      
     
      
    </>
  )
}

export const query = graphql`
  query query_publication {
    allPublicationCsv {
      nodes {
        Address
        Authors
        Category
        Citation
        Dates
        Editor
        File
        GoogleScholarURL
        ID
        Pages
        Publication
        Publisher
        ReferredByURL
        Subject
        Title
        Volume
        Year
        id
      }
    }
  }
  `

export default IndexPage
