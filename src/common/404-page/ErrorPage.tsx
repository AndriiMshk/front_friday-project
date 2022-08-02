import React from 'react';
import img404 from '../../assets/404.gif';
import classes from './ErrorPage.module.css';
import Button from '@mui/material/Button';

export const ErrorPage = () => {
    return <div className={classes.container}>
        <div className={classes.wrapper}>
            <span className={classes.oops}> Ooops! </span>

            <span className={classes.sorry}> Sorry! Page not found! </span>

            <Button variant={'contained'}
                    className={classes.back}
                    href={'/'}
            >
                Back to home page
            </Button>
        </div>

        <img src={img404} alt=''/>
    </div>
};
