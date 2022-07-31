import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import styles from './PacksTable.module.css';
import { setCurrentPageAC, setCurrentPageCountAC } from './packs-reducer';
import { useAppDispatch } from '../../app/store';
import TablePagination from '@mui/material/TablePagination';
import { PackType } from './packsApi';

export const formatDate = (date: Date | string | number) => {
  return new Date(date).toLocaleDateString('ru-RU') + ' ' + new Date(date).toLocaleTimeString();
};

export const PacksTable: React.FC<PacksTablePropsType> = ({ packs, userId, pageCount, rowsPerPage }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    dispatch(setCurrentPageAC(newPage + 1));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setCurrentPageCountAC(+event.target.value));
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Cards Count</TableCell>
              <TableCell align="right">Created By</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {packs?.map((pack) => (
              <TableRow
                key={pack._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <NavLink className={styles.pack}
                           to={`/cards/${pack._id}`}>{pack.name}</NavLink>
                </TableCell>
                <TableCell align="right">{pack.cardsCount}</TableCell>
                <TableCell align="right">{pack.user_name}</TableCell>
                <TableCell align="right">{formatDate(pack.updated)}</TableCell>
                <TableCell className={styles.buttonBlock}>
                  <Button
                    disabled={userId !== pack.user_id}
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                  <Button
                    disabled={userId !== pack.user_id}
                    color="secondary"
                    size="small"
                    startIcon={<BorderColorIcon />}>
                    Edit
                  </Button>
                  <Button
                    disabled={pack.cardsCount === 0}
                    onClick={() => {
                      navigate(`/learn/${pack._id}`);
                    }} color="secondary" size="small"
                    startIcon={<MenuBookIcon />}>
                    Learn
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={pageCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

type PacksTablePropsType = {
  packs: PackType[]
  userId: string
  rowsPerPage: number
  pageCount: number
}

