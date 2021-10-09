import { getStorageItem } from './storage';

export const fetchingIntervalOptions = [1, 5, 10];

export type FetchingInterval = typeof fetchingIntervalOptions[number];

export interface Settings {
  isFetchingEnabled: boolean;
  fetchingInterval: FetchingInterval;

  notificationSoundVolume: number;
  isNotificationSoundEnabled: boolean;
}

export const storageArea = 'sync';
export const storageNamespace = 'settings';

export const defaultSettings = {
  fetchingInterval: 1,
  isFetchingEnabled: false,
  notificationSoundVolume: 100,
  isNotificationSoundEnabled: true,
};

export const retrieveSettings = async () => {
  const settings = await getStorageItem(storageNamespace);

  return { ...defaultSettings, ...settings };
};
