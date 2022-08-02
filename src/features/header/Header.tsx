import * as React from 'react';
import style from './style.module.css';
import testAva from '../../assets/avatar.png';
import {Avatar} from '@mui/material';
import {useAppSelector} from '../../app/store';
import incubatorLogo from '../../assets/incubator.png'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate()
    const profile = useAppSelector(state => state.profile);
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

    return <header>
        <div className={style.container}>
            <div style={{width: '209px', height: '48px'}}>
                <img src={incubatorLogo} alt="it-incubator"/>
            </div>

            {isLoggedIn
                ? <div className={style.wrapper}>
                    {profile.name}
                    <Avatar style={{height: '36px', width: '36px', marginLeft: '12px'}}
                            alt="Remy Sharp"
                            src={profile.avatar ? profile.avatar : testAva}
                    />
                  </div>
                : <Button variant={'contained'}
                          className={style.signIn}
                          onClick={() => navigate('/login')}
                  >
                    Sign in
                  </Button>
            }
        </div>
    </header>
};
