import 'rc-tooltip/assets/bootstrap.css';
import React,{useState,useEffect} from 'react';
import { Grid, Button} from 'semantic-ui-react';
import Slider, { Range } from 'rc-slider';
import Category10 from '../images/Category10.png'

const ThresholdPicker = ({Threshold,data}) => {


    const [LB,setLB] = useState(0.1);
    const [UB,setUB] = useState(0.2);
    const [stats, setStats] = useState({lessLB:0,LBtoUB:0,thanUB:0})

    const BTNhandler = () =>{
        Threshold({LB:LB, UB:UB})
    }

    
        
    useEffect(()=>{
        setStats({
            lessLB:data.filter(d => d.cosine <= LB).length,
            LBtoUB:data.filter(d => d.cosine > LB && d.cosine < UB).length,
            thanUB:data.filter(d => d.cosine >= UB).length
        })
        
        

    },[LB,UB])

    const handler = (e) => {
        setLB(e[0]/100)
        setUB(e[1]/100)
    }

  return (
    <Grid>
        <Grid.Row>
            <Grid.Column width={6}>
                <Grid.Row>
                    <Range allowCross={false} defaultValue={[LB*100,UB*100]} draggableTrack onChange={handler}/>
                </Grid.Row>
                <Grid.Row  style={{paddingTop:30}}>
                    <img src ={Category10} alt="SVG" width={220}/>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column width={3}>
                <p>LB : {LB} | UB : {UB} </p>
            </Grid.Column>
            <Grid.Column width={7}>
                <Grid.Row>
                    <Button onClick={BTNhandler} > Set Colors </Button>
                </Grid.Row>
                <Grid.Row>
                    <br />
                    <p>Total({data.length}) :{stats.lessLB}{'(<LB) '} + {stats.LBtoUB}{'(LB to UB) '}+{stats.thanUB}{'(>UB)'}</p>
                    
                </Grid.Row>
            </Grid.Column>
        </Grid.Row>
        </Grid>

  )
  };

export default ThresholdPicker