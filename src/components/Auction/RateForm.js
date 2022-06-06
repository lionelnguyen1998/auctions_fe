import React from 'react';
import {Avatar, Grid, Button} from "@mui/material";
import { format } from "timeago.js";
import './detail.css'

function RateForm ({t, rate}) {
   
    return (
        <>
        <div key={rate.rate_id}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={rate.user_name} src={rate.user_avatar} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <div>
                        <h4 style={{ margin: 0, textAlign: "left" }}>{rate.user_name}</h4>
                        <span style={{float:"right", color: '#e6efe6'}}>{ format(rate.updated_at) }</span>
                    </div>
                    <p style={{ textAlign: "left", whiteSpace: 'pre-line'}}>
                        {rate.content}
                    </p>
                    {
                        rate.image && (
                            <img src={rate.image} style={{width:'30%'}}/>
                        )
                    }
                    
                    <div style={{ textAlign: "left"}}>
                        {
                            (rate.star === 1) && (
                                <i class="fa fa-star" aria-hidden="true"></i>
                            )
                        } 
                        {
                            (rate.star === 2) && (
                                <div>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </div>
                            )
                        } 
                        {
                            (rate.star === 3) && (
                                <div>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </div>
                            )
                        } 
                        {
                            (rate.star === 4) && (
                                <div>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </div>
                            )
                        } 
                        {
                            (rate.star === 5) && (
                                <div>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                    <i class="fa fa-star" aria-hidden="true"></i>
                                </div>
                            )
                        } 

                    </div>
                    <p style={{ textAlign: "left", color: "gray" }}>
                    <Button color="success"><i class="fa fa-thumbs-up" aria-hidden="true"></i></Button>
                    <Button color="success"><i class="fa fa-pencil-square-o" style={{color: '#007bff'}} aria-hidden="true"></i></Button>
                    </p>
                </Grid>
                
            </Grid>
        </div>
        </>
    )
}

export default RateForm;