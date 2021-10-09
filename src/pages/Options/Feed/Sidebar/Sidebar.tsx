import { useEffect, useState } from 'react';

import {
  Update,
  VolumeUp,
  PowerSettingsNew,
  NotificationsActive,
} from '@material-ui/icons';

import {
  Card,
  List,
  Box,
  Switch,
  Select,
  Slider,
  MenuItem,
  ListItem,
  CardContent,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';

import {
  Settings,
  storageArea,
  defaultSettings,
  storageNamespace,
  fetchingIntervalOptions,
  retrieveSettings as apiRetrieveSettings,
} from '../../../../utils/settings';

import {
  setStorageItem,
  onStorageChange,
  removeChangeListener,
} from '../../../../utils/storage';

import { playNotificationSound } from '../../../../utils/audio';

const Sidebar = () => {
  const [state, setState] = useState();
  const [volume, setVolume] = useState(0);

  const isLoading = !state;

  const {
    fetchingInterval,
    isFetchingEnabled,
    notificationSoundVolume,
    isNotificationSoundEnabled,
  } = { ...defaultSettings, ...(state || {}) };

  const retrieveSettings = async () => {
    try {
      setState(await apiRetrieveSettings());
      // TODO show UI success
    } catch (error) {
      // TODO show UI error
      console.log(error);
    }
  };

  const onSettingsChange = async (partialState: Partial<Settings>) => {
    const previousState = state;
    const settings = { ...(previousState || {}), ...partialState };

    // @ts-ignore
    setState(settings);

    try {
      await setStorageItem(storageNamespace, settings);
      // TODO show UI success
    } catch (e) {
      console.log(e); // TODO show UI warning
      setState(previousState);
    }
  };

  const onVolumeChange = (value: number) => {
    playNotificationSound(value);

    onSettingsChange({ notificationSoundVolume: value });
  };

  useEffect(() => {
    setVolume(notificationSoundVolume);
  }, [notificationSoundVolume]);

  useEffect(() => {
    retrieveSettings();

    const listener = onStorageChange(storageArea, storageNamespace, setState);
    return () => removeChangeListener(listener);
  }, []);

  return (
    <Card>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText>Enable fetching</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                checked={isFetchingEnabled}
                disabled={isLoading}
                onChange={(e) =>
                  onSettingsChange({ isFetchingEnabled: e.target.checked })
                }
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <Update />
            </ListItemIcon>
            <ListItemText>Fetch interval</ListItemText>
            <ListItemSecondaryAction>
              <Select
                value={fetchingInterval}
                disabled={isLoading || !isFetchingEnabled}
                onChange={(e) =>
                  onSettingsChange({
                    fetchingInterval: e.target.value as number,
                  })
                }
              >
                {fetchingIntervalOptions.map((interval) => (
                  <MenuItem value={interval} key={`interval-${interval}`}>
                    {interval} minute{interval > 1 ? 's' : null}
                  </MenuItem>
                ))}
              </Select>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <NotificationsActive />
            </ListItemIcon>
            <ListItemText>Notification sound</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                checked={isNotificationSoundEnabled}
                disabled={isLoading || !isFetchingEnabled}
                onChange={(e) =>
                  onSettingsChange({
                    isNotificationSoundEnabled: e.target.checked,
                  })
                }
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem alignItems="center">
            <ListItemIcon>
              <VolumeUp />
            </ListItemIcon>
            <ListItemText>Volume</ListItemText>
            <Box flex={5} display="flex">
              <Slider
                value={volume}
                onChange={(e, value) => setVolume(value as number)}
                onChangeCommitted={(e, value) =>
                  onVolumeChange(value as number)
                }
                disabled={
                  isLoading || !isFetchingEnabled || !isNotificationSoundEnabled
                }
              />
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
