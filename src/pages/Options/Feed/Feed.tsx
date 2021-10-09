import { Grid, Hidden } from '@material-ui/core';

import Sidebar from './Sidebar/Sidebar';
import JobsList from './JobsList/JobsList';

const Feed = () => (
  <Grid container spacing={3}>
    <Hidden smDown>
      <Grid item md={4} sm={3}>
        <Sidebar />
      </Grid>
    </Hidden>

    <Grid item md={8} sm={12} xs={12}>
      <JobsList />
    </Grid>
  </Grid>
);

export default Feed;
