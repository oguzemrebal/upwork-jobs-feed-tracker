import { Box, Card, Typography, CardContent } from '@material-ui/core';
import { Job } from '../../../../../utils/jobs';

interface JobItemPropTypes {
  job: Job;
}

const JobItem = ({ job }: JobItemPropTypes) => (
  <Box mb={4} component={Card}>
    <CardContent>
      <Typography variant="h5">{job.title}</Typography>

      <Typography
        variant="body2"
        component="div"
        color="textSecondary"
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: job.description }}
      />
    </CardContent>
  </Box>
);

export default JobItem;
