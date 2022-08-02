import {useNavigate} from 'react-router-dom';
import * as React from 'react';
import classes from './BackToPacksList.module.css';

export const BackToPacksList = () => {
    const navigate = useNavigate()

    return <div className={classes.wrapper} onClick={() => navigate('/packs')}>

        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="black" strokeWidth="2"/>
        </svg>

        <span className={classes.back}>Back To Packs List</span>
    </div>
};
