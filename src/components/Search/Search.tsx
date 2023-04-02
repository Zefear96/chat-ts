import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Wrapper, Input } from './SearchStyles';
import { SearchProps } from './interfaces';

const Search = ({value, setValue}: SearchProps) => {
  return (
    <Wrapper>
      <SearchIcon />
      <Input placeholder='Search' value={value} onChange={(e): void => setValue(e.target.value)}/>
    </Wrapper>
  )
}

export default Search