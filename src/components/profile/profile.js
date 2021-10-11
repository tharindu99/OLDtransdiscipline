import React from 'react';
import { Segment, Card} from 'semantic-ui-react'

const Profile = ({data}) => {

    const items = [
        {
          header: 'University of ABC',
          description:
            'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
          meta: '2019-2021',
        },
        {
          header: 'University of BCD',
          description:
            'Bring to the table win-win survival strategies to ensure proactive domination.',
          meta: '2016-2019',
        },
      ]

      

    return (
        <Segment>
           <Card.Group centered items={items} itemsPerRow={1}/>
        </Segment>
    );
};

export default Profile;