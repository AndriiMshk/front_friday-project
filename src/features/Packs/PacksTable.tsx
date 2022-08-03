import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deletePackTC, setCurrentPageAC, setCurrentPageCountAC, updatePackTC } from './packs-reducer';
import { useAppDispatch } from '../../app/store';
import TablePagination from '@mui/material/TablePagination';
import { PackType } from './packsApi';
import { PackItem } from './PackItem';
import TableSortLabel from '@mui/material/TableSortLabel';

export const formatDate = (date: Date | string | number) => {
  return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString();
};

export const PacksTable: React.FC<PacksTablePropsType> = (
  { packs, userId, pageCount, rowsPerPage, order, orderBy, handleRequestSort }) => {

  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(0);

  const changePageHandler = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    dispatch(setCurrentPageAC(newPage + 1));
  };

  const changeRowsPerPageHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setCurrentPageCountAC(+event.target.value));
  };

  const deletePackHandler = (packId: string) => {
    dispatch(deletePackTC(packId));
  };

  const changePackNameHandler = (packId: string, newPackName: string) => {
    dispatch(updatePackTC(packId, newPackName));
  };

  const headers = [
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'cardsCount',
      label: 'Cards Count',
    },
    {
      id: 'created',
      label: 'Created By',
    },
    {
      id: 'updated',
      label: 'Last Updated',
    },
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(el =>
                <TableCell
                  key={el.id}
                  sortDirection={orderBy === el.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === el.id}
                    direction={orderBy === el.id ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, el.id)}
                  >
                    {el.label}
                  </TableSortLabel>
                </TableCell>)}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs?.map((pack) => (
              <PackItem
                key={pack._id}
                pack={pack}
                userId={userId}
                deletePackHandler={deletePackHandler}
                changePackNameHandler={changePackNameHandler}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={pageCount}
        page={page}
        onPageChange={changePageHandler}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={changeRowsPerPageHandler}
      />
    </div>
  );
};

type PacksTablePropsType = {
  packs: PackType[]
  userId: string
  rowsPerPage: number
  pageCount: number
  order: any
  orderBy: any
  handleRequestSort: any
}

