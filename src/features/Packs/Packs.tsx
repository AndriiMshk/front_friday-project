import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {PacksTable} from './PacksTable';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {createPackTC, setPacksTC} from './packs-reducer';
import useDebounce from '../../common/hooks/useDebounce';
import {Button} from '@mui/material';
import style from './Packs.module.css'
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {SliderFilter} from "./Slider";

export const Packs = () => {

  const dispatch = useAppDispatch();

  const packs = useAppSelector(state => state.packs.cardPacks);
  const userId = useAppSelector(state => state.profile._id);

  const page = useAppSelector(state => state.packs.page);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const rowsPerPage = useAppSelector(state => state.packs.pageCount);
  const pageCount = useAppSelector(state => state.packs.cardPacksTotalCount);

  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const [filterByCardsCount, setFilterByCardsCount] = useState<number[]>([0, maxCardsCount]);

  const [isShowMyPacks, setIsShowMyPacks0] = useState(false);

  const [packName, setPackName] = useState<string>('');

    const addNewPackHandler = () => {
        const name = prompt();
        if (name) {
            dispatch(createPackTC(name));
        }
    };

  useEffect(() => {
    dispatch(setPacksTC(
      {
        page,
        pageCount: rowsPerPage,
        min: filterByCardsCount[0],
        max: filterByCardsCount[1],
        user_id: isShowMyPacks ? userId : undefined,
        packName: !!packName ? packName : undefined,
      }));
  }, [
    page,
    pageCount,
    rowsPerPage,
    useDebounce(filterByCardsCount),
    isShowMyPacks,
    useDebounce(packName),
    packs.length,
  ]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.sidebar}>
                    <div className={style.sidebarBlock}>
                        <h2>Show packs</h2>
                        <ButtonGroup disableElevation>
                            <Button
                                onClick={() => setIsShowMyPacks0(false)}
                                variant={!isShowMyPacks ? 'contained' : 'text'}
                            >All</Button>
                            <Button
                                onClick={() => setIsShowMyPacks0(true)}
                                variant={isShowMyPacks ? 'contained' : 'text'}
                            >My</Button>
                        </ButtonGroup>
                        <SliderFilter
                            filterByCardsCount={filterByCardsCount}
                            setFilterByCardsCount={setFilterByCardsCount}
                        />

                    </div>
                </div>
                <div className={style.mainBlock}>
                    <h1 className={style.title}>Packs list</h1>
                    <div className={style.searchAndAdd}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': {m: 1, width: '25ch'},
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="search"
                                label="search"
                                variant="outlined"
                                value={packName}
                                onChange={(e) => setPackName(e.target.value)}
                            />
                        </Box>
                        <Button
                            onClick={addNewPackHandler}
                            variant="contained"
                        >Add new pack</Button>
                    </div>
                    <div className={style.table}>
                        <PacksTable
                            packs={packs}
                            userId={userId}
                            rowsPerPage={rowsPerPage}
                            pageCount={pageCount}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


