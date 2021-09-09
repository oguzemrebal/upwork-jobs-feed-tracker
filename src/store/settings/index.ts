import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Settings } from './types';
import { RootState } from '../index';

export const initialState: Settings = {
  fetchingInterval: 1,
  isFetchingEnabled: false,
  notificationSoundVolume: 100,
  isNotificationSoundEnabled: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state: Settings, action: PayloadAction<Object>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const selectFetchingInterval = (state: RootState) =>
  selectSettings(state).fetchingInterval;

export const selectIsFetchingEnabled = (state: RootState) =>
  selectSettings(state).isFetchingEnabled;

export const selectIsNotificationSoundEnabled = (state: RootState) =>
  selectSettings(state).isNotificationSoundEnabled;

export const selectNotificationSoundVolume = (state: RootState) =>
  selectSettings(state).notificationSoundVolume;

export default settingsSlice.reducer;
