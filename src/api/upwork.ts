import { getApiInstance } from '../utils/api';

export const upworkApi = getApiInstance({
  baseURL: 'https://www.upwork.com/ab',
});

const retrieveJobs = () =>
  upworkApi.get('find-work/api/feeds/search', {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

export const pingSession = () => upworkApi.get('account-security/login');

export const fetchJobs = async () => {
  await pingSession();
  return retrieveJobs();
};
