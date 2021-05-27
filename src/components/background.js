import React, { useState } from 'react';
import Particles from 'react-particles-js';

const Background_cmp = () => {

    const style = {
        h1: {
          marginTop: '1rem',
        },
        Particles:{
            position: 'absolute',
            width: '100%',
            height: '100%',
        }
      }

    return(
        <div style={style.Particles}>
            <Particles
                    params={{
                        particles: {
                        color: {
                            value: "#f44242"
                        },
                        number: {
                            value: 100
                        },
                        size: {
                            value: 3
                        },
                        line_linked: {
                            color: '#f44242',
                            opacity: 1
                        }
                        },
                        interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: "repulse"
                            }
                        }
                        }
                    }}
                    />
        </div>
        
    )

}

export default Background_cmp;