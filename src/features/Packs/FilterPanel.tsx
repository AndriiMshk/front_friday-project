import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { SliderFilter } from './Slider';

export const FilterPanel: React.FC<FilterPanelPropsType> = (
  {
    filterByCardsCount,
    setFilterByCardsCount,
    isShowMyPacks,
    setIsShowMyPacks,
    packName,
    setPackName,
  }) => {

  return (
    <div>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
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
      
      <ButtonGroup disableElevation>
        <Button
          onClick={() => setIsShowMyPacks(false)}
          variant={!isShowMyPacks ? 'contained' : 'text'}
        >All</Button>
        <Button
          onClick={() => setIsShowMyPacks(true)}
          variant={isShowMyPacks ? 'contained' : 'text'}
        >My</Button>
      </ButtonGroup>

      <SliderFilter
        filterByCardsCount={filterByCardsCount}
        setFilterByCardsCount={setFilterByCardsCount}
      />
    </div>
  );
};

type FilterPanelPropsType = {
  filterByCardsCount: number[]
  setFilterByCardsCount: (values: number[]) => void
  isShowMyPacks: boolean
  setIsShowMyPacks: (isShowMyPacks: boolean) => void
  packName: string
  setPackName: (packName: string) => void
}