import { CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';
export const Loader = ({minHeight = '100vh'}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: minHeight }}
    >
      <Grid item xs={3} sx={{color: 'blue'}}>
        <CircularProgress sx={{color: 'blue'}} />
      </Grid>
    </Grid>
  );
};
