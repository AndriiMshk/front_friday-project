import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Rating, TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import { formatDate } from '../Packs/PacksTable';
import styles from './Cards.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TableContainer from '@mui/material/TableContainer';
import { useAppDispatch } from '../../app/store';
import { CardType } from './cardsApi';
import { setCurrentPageAC, setCurrentPageCountAC } from './cards-reducer';
import TablePagination from '@mui/material/TablePagination';

export const CardsTable: React.FC<CardsTablePropsType> = ({ cards, userId, pageCount, rowsPerPage }) => {

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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards?.map((card) => (
              <TableRow
                key={card._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {card.question}
                </TableCell>
                <TableCell align="right">{card.answer}</TableCell>
                <TableCell align="right"><Rating name="read-only" value={card.grade} readOnly />
                </TableCell>
                <TableCell align="right">{formatDate(card.updated)}</TableCell>
                <TableCell className={styles.buttonBlock}>
                  <Button
                    disabled={userId !== card.user_id}
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}>
                    Delete
                  </Button>
                  <Button
                    disabled={userId !== card.user_id}
                    color="secondary" size="small"
                    startIcon={<BorderColorIcon />}>
                    Edit
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
    </>
  );
};

type CardsTablePropsType = {
  cards: CardType[]
  userId: string
  rowsPerPage: number
  pageCount: number
}