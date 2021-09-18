import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { Settings, SettingsState } from './types';
import { getItem, setItem } from '../../utils/storage';

export const SETTINGS = 'SETTINGS';

export const initialState: SettingsState = {
  loading: false,
  config: {
    fetchingInterval: 1,
    isFetchingEnabled: false,
    notificationSoundVolume: 100,
    isNotificationSoundEnabled: false,
  },
};

export const selectSettings = (state: RootState): SettingsState =>
  state.settings;

export const selectSettingsLoading = (state: RootState) =>
  selectSettings(state).loading;

export const selectSettingsConfig = (state: RootState) => state.settings.config;

export const selectIsFetchingEnabled = (state: RootState) =>
  selectSettingsConfig(state).isFetchingEnabled;

export const selectFetchingInterval = (state: RootState) =>
  selectSettingsConfig(state).fetchingInterval;

export const selectIsNotificationSoundEnabled = (state: RootState) =>
  selectSettingsConfig(state).isNotificationSoundEnabled;

export const selectNotificationSoundVolume = (state: RootState) =>
  selectSettingsConfig(state).notificationSoundVolume;

export const selectRequestInProgress = (state: RootState) =>
  state.settings.loading;

export const fetchSettings = createAsyncThunk('settings/fetch', async () => {
  const payload = await getItem(SETTINGS);

  // TODO enable chrome alarm/interval from here
  console.log('Fire chrome alarm');

  return payload;
});

export const saveSettings = createAsyncThunk(
  'settings/save',
  async (partialConfig: Partial<Settings>, { getState }) => {
    const oldConfig = selectSettingsConfig(getState() as RootState);

    const payload = await setItem(SETTINGS, {
      ...oldConfig,
      ...partialConfig,
    });

    // // TODO Add UI notification about successful saving
    console.log('settings saved');

    return payload;
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(fetchSettings.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      config: action.payload,
    }));
    builder.addCase(fetchSettings.rejected, (state) => ({
      ...state,
      loading: false,
    }));

    builder.addCase(saveSettings.pending, (state) => ({
      ...state,
      loading: true,
    }));
    builder.addCase(saveSettings.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      config: action.payload,
    }));
    builder.addCase(saveSettings.rejected, (state) => ({
      ...state,
      loading: false,
    }));
  },
});

export default settingsSlice.reducer;
