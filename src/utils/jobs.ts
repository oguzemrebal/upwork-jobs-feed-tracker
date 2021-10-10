import {
  onStorageChange,
  getLocalStorageItem,
  setLocalStorageItem,
  removeChangeListener,
} from './storage';

export interface Attribute {
  prettyName: string;
  highlighted: boolean;
}

export interface Client {
  paymentVerificationStatus: number;
  totalFeedback: number;
  totalSpent: number;

  location: {
    country: string;
  };
}

export interface Job {
  title: string;
  type: number;
  tierText: string;
  description: string;

  amount: {
    amount: number;
    currencyCode: string;
  };

  client: Client;
  attrs: Attribute[];

  cipherText: string;
  duration: string;
  createdOn: Date;

  // internal attribute
  __isSeen: boolean;
}

export const storageArea = 'local';
export const storageNamespace = 'jobs';

export const retrieveJobs = async (): Promise<Job[]> =>
  (await getLocalStorageItem(storageNamespace)) || [];

export const saveJobs = (jobs: Job[]): Promise<Job[]> =>
  setLocalStorageItem(storageNamespace, jobs);

export const onJobsChange = (
  callback: (updatedValue: any, oldValue: any) => void
) => {
  const listenerId = onStorageChange(storageArea, storageNamespace, callback);
  return () => removeChangeListener(listenerId);
};
