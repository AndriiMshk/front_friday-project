import React from 'react';
import loader from '../../assets/preloader.gif';

export const Preloader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={loader} alt={'preloader'}/>
        </div>
    );
};