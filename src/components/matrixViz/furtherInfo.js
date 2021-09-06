import React, {useEffect,useRef, useState} from 'react'
import { Card, Grid, Button, Rail, Segment, Sticky, Header } from 'semantic-ui-react'

const FurtherInfo = ({data,pdf_files, publications}) => {

    let data_filler = {'similarity':0, docs:[]}

    console.log(publications)

    if(data.docs.length === 2){
        const doc1_id = data.docs[0].docID.slice(0,-4)
        const doc2_id = data.docs[1].docID.slice(0,-4)

        const doc1 = pdf_files.filter(d => d.name === ""+doc1_id)[0]
        const doc1_further = publications.filter(d => d.File == "pdf/"+doc1_id+".pdf")


        const doc2 = pdf_files.filter(d => d.name === ""+doc2_id)[0]
        const doc2_further = publications.filter(d => d.File == "pdf/"+doc2_id+".pdf")
        
        data_filler.docs.push(
            {
                name: (doc1_further.length > 0) ? doc1_further[0].Title:doc1_id+'.pdf',
                doc_id: doc1_id,
                publicURL: doc1.publicURL
            }
        )
        data_filler.docs.push(
            {
                name:(doc2_further.length > 0) ? doc2_further[0].Title:doc2_id+'.pdf',
                doc_id: doc2_id,
                publicURL: doc2.publicURL
            }
        )
        console.log(doc1_further)
        console.log(data_filler)
    } 

    return (
        <>
        {/* <Sticky pushing>
            <Header as='h3'>Stuck Content</Header>
        </Sticky> */}
        <Rail internal position='right' style={{}}>
            <Segment>
                <h4>Similarity: {data.similarity} </h4>
            {data_filler.docs.map((doc) => (
                <Card
                    id={doc.doc_id}
                    href={doc.publicURL}
                    target="_blank"
                    header={doc.name}
                    meta={doc.doc_id+'.pdf'}
                    description=''
                />
            ))}
            </Segment>
            
        </Rail>
        </>
    )
}

export default FurtherInfo