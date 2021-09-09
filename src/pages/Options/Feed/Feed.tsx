import { Box, Grid, Hidden } from '@material-ui/core';
import OptionSidebar from '../../../components/OptionSidebar/OptionSidebar';

const Feed = () => (
  <Grid container spacing={3}>
    <Hidden smDown>
      <Grid item md={4} sm={3}>
        <OptionSidebar />
      </Grid>
    </Hidden>

    <Grid item md={8} sm={12} xs={12}>
      <Box width="100%" style={{ background: '#fff' }} height={400}>
        content
      </Box>
    </Grid>
  </Grid>
);

export default Feed;
