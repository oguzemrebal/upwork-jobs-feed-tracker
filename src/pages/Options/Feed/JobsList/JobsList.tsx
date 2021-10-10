import { useEffect, useState } from 'react';
import { Box, Link } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import {
  Job,
  onJobsChange,
  retrieveJobs as apiRetrieveJobs,
} from '../../../../utils/jobs';

import JobItem from './JobItem/JobItem';
import { filtersWarning } from '../../../../utils/links';
import JobItemLoading from './JobItemLoading/JobItemLoading';

const JobsList = () => {
  const [loaded, setLoaded] = useState(false);
  const [jobs, setJobs] = useState([] as Job[]);

  const retrieveJobs = async () => {
    try {
      const payload = await apiRetrieveJobs();

      setLoaded(true);
      setJobs(payload);
    } catch (error) {
      // TODO show UI error
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveJobs();

    return onJobsChange(setJobs);
  }, []);

  if (!loaded || !Array.isArray(jobs)) {
    return (
      <>
        <JobItemLoading />
        <JobItemLoading />
        <JobItemLoading />
      </>
    );
  }

  if (jobs.length === 0) {
    return (
      <Box maxWidth={400}>
        <Alert severity="info">
          <AlertTitle>No jobs yet</AlertTitle>
          Consider&nbsp;
          <Link target="_blank" href={filtersWarning} rel="noopener noreferrer">
            configuring filters.
          </Link>
        </Alert>
      </Box>
    );
  }

  return (
    <>
      {jobs.map((job) => (
        <JobItem job={job} key={`job-item-${job.cipherText}`} />
      ))}
    </>
  );
};

export default JobsList;
