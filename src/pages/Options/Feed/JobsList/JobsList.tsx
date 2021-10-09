import { useEffect, useState } from 'react';
import { Box, Link } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import {
  onStorageChange,
  getLocalStorageItem,
  removeChangeListener,
} from '../../../../utils/storage';

import JobItem from './JobItem/JobItem';
import { Job } from '../../../../store/jobs/types';

export const storageArea = 'local';
export const storageNamespace = 'jobs';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  const retrieveJobs = async () =>
    setJobs(await getLocalStorageItem(storageNamespace));

  const showJobs = Array.isArray(jobs) && jobs.length > 0;
  const showEmptyMessage = !jobs || (Array.isArray(jobs) && jobs.length === 0);

  useEffect(() => {
    retrieveJobs();

    const listener = onStorageChange(storageArea, storageNamespace, setJobs);
    return () => removeChangeListener(listener);
  }, []);

  return (
    <div>
      {showJobs &&
        jobs.map((job: Job) => (
          <JobItem job={job} key={`job-item-${job.cipherText}`} />
        ))}

      {showEmptyMessage && (
        <Box maxWidth={400}>
          <Alert severity="info">
            <AlertTitle>No jobs yet</AlertTitle>
            Consider&nbsp;
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/neeilya/upwork-jobs-feed-tracker#warning-to-freelancers"
            >
              configuring filters.
            </Link>
          </Alert>
        </Box>
      )}
    </div>
  );
};

export default JobsList;
