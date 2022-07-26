import { Button, FormControl, Input } from '@mui/material';
import { InputAdornment } from '@material-ui/core';
import * as React from 'react';

export const EditNameForm: React.FC<EditNameFormPropsType> = (
  { handleSubmit, handleChange, name, setEditMode, newName },
) => {

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Escape') {
      setEditMode(false);
      name = newName;
    }
  };

  return (
    <FormControl>
      <form onSubmit={handleSubmit}>
        <Input
          autoFocus
          autoComplete={'off'}
          onKeyDown={onKeyDownHandler}
          name="name"
          onChange={handleChange}
          value={newName}
          onBlur={() => handleSubmit()}
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                style={{ height: '24px', width: '54px' }}
                type={'submit'}
              >SAVE
              </Button>
            </InputAdornment>
          }
        />
      </form>
    </FormControl>
  );
};

type EditNameFormPropsType = {
  handleSubmit: () => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  name: string
  newName: string
  setEditMode: (mode: boolean) => void
}
