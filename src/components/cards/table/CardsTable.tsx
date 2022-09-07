import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableCell } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { useAppDispatch } from '../../../app/bll-dal/store';
import TablePagination from '@mui/material/TablePagination';
import { CardItem } from './CardItem';
import { setCurrentPageAction, setCurrentPageCountAction } from '../bll-dal/cards-reducer';
import { deleteCard, updateCard } from '../bll-dal/cards-async-actions';
import { CardType } from '../../../app/bll-dal/types';
import style from '../cards.module.scss';

const tableHeaderTitles = ['Question', 'Answer', 'Grade', 'Updated', 'Actions'];

export const CardsTable: React.FC<CardsTablePropsType> = ({ cards, userId, pageCount, rowsPerPage }) => {

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(0);

  const changePageHandler = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
    dispatch(setCurrentPageAction(newPage + 1));
  };

  const changeRowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setCurrentPageCountAction(+event.target.value));
  };

  const deleteCardHandler = (cardId: string | undefined) => {cardId && dispatch(deleteCard(cardId));};

  const updateCardHandler = (cardId: string | undefined, question: string, comment: string) => {
    if (cardId && question && comment) {dispatch(updateCard(cardId, question, comment));}
  };

  return (
    <div className={style.cardsTable}>
      <TableContainer component={Paper}>
        {cards.length
          ? <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {tableHeaderTitles.map((el, index) => <TableCell key={index} align="center">{el}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {cards.map(card => (
                <CardItem
                  key={card._id}
                  card={card}
                  userId={userId}
                  deleteCardHandler={deleteCardHandler}
                  updateCardHandler={updateCardHandler} />))}
            </TableBody>
          </Table>
          : <h3>Cards not found</h3>}
      </TableContainer>
      <TablePagination
        component="div"
        count={pageCount}
        page={page}
        onPageChange={changePageHandler}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={changeRowsPerPageHandler}
        rowsPerPageOptions={[5, 10, 15, 20]} />
    </div>
  );
};

type CardsTablePropsType = {
  cards: CardType[]
  userId: string
  rowsPerPage: number
  pageCount: number
}
