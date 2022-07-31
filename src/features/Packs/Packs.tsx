import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PacksTable } from './PacksTable';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { createPackTC, setPacksTC } from './packs-reducer';
import { FilterPanel } from './FilterPanel';
import useDebounce from '../../common/hooks/useDebounce';
import { Button } from '@mui/material';

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

  const checkUserId = () => {
    if (isShowMyPacks) {
      return userId;
    } else {
      return undefined;
    }
  };

  const [packName, setPackName] = useState('');

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
        user_id: checkUserId(),
        packName: packName,
      }));
  }, [
    page,
    pageCount,
    rowsPerPage,
    useDebounce(filterByCardsCount),
    isShowMyPacks,
    useDebounce(packName),
    packs.length
  ]);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <h3>Packs list</h3>
      <Button
        onClick={addNewPackHandler}
        variant="contained"
      >Add new pack</Button>
      <FilterPanel
        filterByCardsCount={filterByCardsCount}
        setFilterByCardsCount={setFilterByCardsCount}
        isShowMyPacks={isShowMyPacks}
        setIsShowMyPacks={setIsShowMyPacks0}
        packName={packName}
        setPackName={setPackName}
      />
      <PacksTable
        packs={packs}
        userId={userId}
        rowsPerPage={rowsPerPage}
        pageCount={pageCount} />
    </div>
  );
};



