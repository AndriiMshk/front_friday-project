import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setCurrentPageAC, setCurrentPageCountAC } from '../packs-reducer';

export default function TablePaginationDemo() {

  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);

  const rowsPerPage = useAppSelector(state => state.packs.pageCount);
  const pageCount = useAppSelector(state => state.packs.cardPacksTotalCount);

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
    <TablePagination
      component="div"
      count={pageCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
