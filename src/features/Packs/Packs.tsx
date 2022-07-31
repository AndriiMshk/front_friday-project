import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { PacksTable } from './PacksTable';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { setPacksTC } from './packs-reducer';

export const Packs = () => {

  const dispatch = useAppDispatch();

  const packs = useAppSelector(state => state.packs.cardPacks);
  const userId = useAppSelector(state => state.profile._id);

  const page = useAppSelector(state => state.packs.page);
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn);

  const rowsPerPage = useAppSelector(state => state.packs.pageCount);
  const pageCount = useAppSelector(state => state.packs.cardPacksTotalCount);

  useEffect(() => {
    dispatch(setPacksTC({ page, pageCount: rowsPerPage}));
  }, [page, pageCount, rowsPerPage]);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <div>
      <PacksTable packs={packs} userId={userId} rowsPerPage={rowsPerPage} pageCount={pageCount}/>
    </div>
  );
};



