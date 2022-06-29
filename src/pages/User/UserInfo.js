import React from 'react';
import {Avatar, Grid, Typography} from "@mui/material";
import './index.css'

function UserInfo({userInfo, t}) {
    return (
        <>
        <Grid container spacing={10}>
            <Grid item>
            <Avatar
                alt={userInfo.name}
                src={userInfo.avatar}
                sx={{ width: 150, height: 150 }}
            />
            </Grid>
            <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        <b>{t('user_auctions.user_name')}:　　　　　　　</b> {userInfo.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        <b>{t('user_auctions.email')}:　　</b> {userInfo.email}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        <b>{t('user_auctions.phone')}:　　　　　</b> {userInfo.phone}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        <b>{t('user_auctions.address')}:　　　　　</b> {userInfo.address}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="div">
                        <b>{t('user_auctions.role')}:　　　　　　　</b> {t(`user_auctions.${userInfo.role}`)}
                    </Typography>
                </Grid>
            </Grid>
            {/* <Grid item>
                <Typography variant="subtitle1" component="div">
                    <b>オークション:　　　</b> {userInfo.total_auctions} オークション
                </Typography>
                <Typography variant="subtitle1" component="div">
                    <b>気に入る:　　　　　</b> {userInfo.total_like} オークション
                </Typography>
            </Grid> */}
            </Grid>
        </Grid>
        </>
    )
}

export default UserInfo;