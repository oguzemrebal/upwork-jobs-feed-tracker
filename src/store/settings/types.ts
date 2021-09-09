export const fetchingIntervalOptions = [1, 5, 10];

export type FetchingInterval = typeof fetchingIntervalOptions[number];

export interface Settings {
  isFetchingEnabled: boolean;
  fetchingInterval: FetchingInterval;

  notificationSoundVolume: number;
  isNotificationSoundEnabled: boolean;
}
