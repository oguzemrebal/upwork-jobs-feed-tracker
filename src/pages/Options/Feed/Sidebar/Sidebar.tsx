import { useEffect, useState } from 'react';
import { Skeleton } from '@material-ui/lab';

import {
  Update,
  VolumeUp,
  PowerSettingsNew,
  NotificationsActive,
} from '@material-ui/icons';

import {
  Box,
  Card,
  List,
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
  defaultSettings,
  onSettingsChanged,
  fetchingIntervalOptions,
  saveSettings as apiSaveSettings,
  retrieveSettings as apiRetrieveSettings,
} from '../../../../utils/settings';

import { playNotificationSound } from '../../../../utils/audio';

const Sidebar = () => {
  const [volume, setVolume] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  const {
    fetchingInterval,
    isFetchingEnabled,
    notificationSoundVolume,
    isNotificationSoundEnabled,
  } = settings;

  const retrieveSettings = async () => {
    try {
      const payload = await apiRetrieveSettings();

      setLoaded(true);
      setSettings(payload);
    } catch (error) {
      // TODO show UI error
      console.log(error);
    }
  };

  const onSettingsChange = async (partialState: Partial<Settings>) => {
    const previousState = settings;
    const newSettings = { ...previousState, ...partialState };

    setSettings(newSettings);

    try {
      await apiSaveSettings(newSettings);
    } catch (e) {
      // TODO show UI warning
      console.log(e);

      setSettings(previousState);
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

    return onSettingsChanged(setSettings);
  }, []);

  if (!loaded) {
    return <Skeleton variant="rect" height={200} width="100%" />;
  }

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
                disabled={!isFetchingEnabled}
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
                disabled={!isFetchingEnabled}
                checked={isNotificationSoundEnabled}
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
                disabled={!isFetchingEnabled || !isNotificationSoundEnabled}
              />
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
