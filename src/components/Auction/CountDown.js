import React, {Fragment,  useEffect, useState} from 'react';
import {Button} from "@mui/material";
import auctionApi from '../api/auctionApi';

function CountDown(startDate) {
    const countDownDate = new Date(startDate.startDate).getTime();
    const [status, setStatus] = useState(0)
    
    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );
    
    useEffect(() => {
        const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
        }, 1000);
    
        return () => clearInterval(interval);
    }, [countDownDate]);

    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    const total = days + hours + minutes + seconds;

    if (total === 0) {
        setStatus(status + 1)
    }
    useEffect(() => {
        auctionApi.update();
    }, [status])
    
    return (
        <Fragment>
            {
                (total > 0) && (
                    <>
                        <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                            {days} 日
                        </Button>
                        <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                            {hours} 時
                        </Button>
                        <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                            {minutes} 分
                        </Button>
                        <Button disabled size="small" variant="outlined" style={{ color: '#4CAF50', height: '20px'}}>
                            {seconds} 秒
                        </Button>
                    </>
                )
            }
            
        </Fragment>
    )
}
export default CountDown;