import { Box, Grid } from '@material-ui/core';
import OptionSidebar from '../../../components/OptionSidebar/OptionSidebar';

const Feed = () => (
  <Grid container spacing={3}>
    <Grid item md={4}>
      <OptionSidebar />
    </Grid>

    <Grid item md={8}>
      <Box width="100%" style={{ background: '#fff' }} height={400}>
        content
      </Box>
    </Grid>
  </Grid>
);

export default Feed;
