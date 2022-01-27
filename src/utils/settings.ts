import {
  getStorageItem,
  setStorageItem,
  onStorageChange,
  removeChangeListener,
} from './storage';

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

export const defaultSettings: Settings = {
  fetchingInterval: 1,
  isFetchingEnabled: false,
  notificationSoundVolume: 100,
  isNotificationSoundEnabled: true,
};

export const retrieveSettings = async (): Promise<Settings> =>
  (await getStorageItem(storageNamespace)) || defaultSettings;

export const saveSettings = (settings: Settings): Promise<Settings> =>
  setStorageItem(storageNamespace, settings);

export const onSettingsChanged = (
  callback: (updatedValue: Settings, oldValue: Settings) => void
) => {
  const listenerId = onStorageChange(storageArea, storageNamespace, callback);
  return () => removeChangeListener(listenerId);
};
