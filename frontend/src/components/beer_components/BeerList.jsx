import { LinearProgress, InputLabel, Box, Select, MenuItem, FormControl } from '@mui/material';
import { Masonry } from '@mui/lab';

import BeerCard from './BeerCard';
import BeerCardSideImage from './BeerCardSideImage';

const BeerList = ({ beers, sortingOption, setSortingOption }) => {
   return !beers.length ? (
      <LinearProgress />
   ) : (
      <Box>
         <FormControl variant='standard' fullWidth>
            <InputLabel id='select-sorting-method'>Sort</InputLabel>
            <Select
               labelId='select-sorting-method'
               id='select-sort'
               value={sortingOption}
               label='Sort'
               onChange={e => setSortingOption(e.target.value)}
            >
               <MenuItem value={0}>Default sorting</MenuItem>
               <MenuItem value={1}>Sort by name (ascending)</MenuItem>
               <MenuItem value={2}>Sort by name (descending)</MenuItem>
               <MenuItem value={3}>Sort by type (ascending)</MenuItem>
               <MenuItem value={4}>Sort by type (descending)</MenuItem>
               <MenuItem value={5}>Sort by abv (ascending)</MenuItem>
               <MenuItem value={6}>Sort by abv (descending)</MenuItem>
               <MenuItem value={7}>Sort by ibu (ascending)</MenuItem>
               <MenuItem value={8}>Sort by ibu (descending)</MenuItem>
            </Select>
         </FormControl>
         <Masonry
            columns={sortingOption === 0 ? { xs: 1, sm: 2, md: 2, lg: 3, xl: 3 } : '1'}
            spacing={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2 }}
            sx={{ mb: 0 }}
         >
            {beers.map(beer => {
               return sortingOption === 0 ? <BeerCard beer={beer} /> : <BeerCardSideImage beer={beer} />;
            })}
         </Masonry>
      </Box>
   );
};
export default BeerList;
