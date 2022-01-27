import axios from 'axios';

export const upworkApi = axios.create({
  baseURL: 'https://www.upwork.com/ab',
});
