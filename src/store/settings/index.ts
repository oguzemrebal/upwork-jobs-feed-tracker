import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { Settings, SettingsState } from './types';
import { getItem, setItem } from '../../utils/storage';
import { playNotificationSound } from '../../utils/audio';

export const SETTINGS = 'SETTINGS';

export const initialState: SettingsState = {
  loading: false,
  config: {
    fetchingInterval: 1,
    isFetchingEnabled: true,
    notificationSoundVolume: 100,
    isNotificationSoundEnabled: true,
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

    // TODO Add UI notification about successful saving
    console.log('settings saved');

    if (!!partialConfig.notificationSoundVolume) {
      playNotificationSound(partialConfig.notificationSoundVolume);
    }

    return payload;
  }
);

export const onSettingsPending = (state: SettingsState) => ({
  ...state,
  loading: true,
});

export const onSettingsFulfilled = (
  state: SettingsState,
  action: PayloadAction<Partial<Settings>>
) => ({
  ...state,
  loading: false,
  config: {
    ...state.config,
    ...action.payload,
  },
});

export const onSettingsRejected = (state: SettingsState) => ({
  ...state,
  loading: false,
});

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.pending, onSettingsPending);
    builder.addCase(fetchSettings.fulfilled, onSettingsFulfilled);
    builder.addCase(fetchSettings.rejected, onSettingsRejected);

    builder.addCase(saveSettings.pending, onSettingsPending);
    builder.addCase(saveSettings.fulfilled, onSettingsFulfilled);
    builder.addCase(saveSettings.rejected, onSettingsRejected);
  },
});

export default settingsSlice.reducer;
