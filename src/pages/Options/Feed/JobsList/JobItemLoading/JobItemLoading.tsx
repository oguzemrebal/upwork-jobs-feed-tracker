import { Skeleton } from '@material-ui/lab';
import { Box, Card } from '@material-ui/core';

const JobItemLoading = () => (
  <Box mb={2} component={Card}>
    <Skeleton variant="rect" height={300} width="100%" />
  </Box>
);

export default JobItemLoading;
