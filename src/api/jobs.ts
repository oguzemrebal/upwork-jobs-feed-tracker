import { Job } from '../utils/jobs';
import { upworkApi } from '../utils/upworkApi';

interface FetchJobsResponse {
  results: Job[];
}

const retrieveJobs = (): Promise<FetchJobsResponse> =>
  upworkApi.get('find-work/api/feeds/saved-searches', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

export const pingSession = () => upworkApi.get('account-security/login');

export const fetchJobs = async () => {
  await pingSession();
  const { results } = await retrieveJobs();
  return results;
};
