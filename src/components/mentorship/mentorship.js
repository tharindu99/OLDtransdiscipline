import React, { useState,useEffect, useMemo } from 'react';
import { Segment, Card, Header, Icon, Divider } from 'semantic-ui-react';

const Mentorship = ({data}) => {

    const [Data, SetData] = useState([]);

    const students = data.map(s =>(
        <Card 
            key= {s.id}
            //href={(s.LinkedIn === 'NULL')?'':s.LinkedIn}
            header={s.Name}
            meta={(s.Current === 'NULL')?'':s.Current}
            description={[
            'Research: ',
             s.Title,' ',
             s.Institution,
            ].join('')}
            extra={s.Year}
        />
    ))

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
            
    
            <Card.Group itemsPerRow={4}>
                {students}
            </Card.Group>
        </Segment>
    )
}

export default Mentorship