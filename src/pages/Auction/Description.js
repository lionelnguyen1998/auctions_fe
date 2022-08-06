import React from 'react';
import {Paper} from "@mui/material";

function Description({description, t}) {
    return (
        <>
        <Paper style={{ padding: "20px", marginBottom: "40px"}} className="container">
        <section className="featured spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="section-title">
                           <p style={{float: 'left', fontWeight: 'bold', fontSize:'20px'}}>{t('description.des')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <p style={{whiteSpace: 'pre-line'}}>{description}</p>      
        </Paper>
        </>
    )
}

export default Description;