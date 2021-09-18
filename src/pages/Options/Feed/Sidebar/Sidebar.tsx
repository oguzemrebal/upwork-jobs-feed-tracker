import { useEffect, useState } from 'react';

import {
  Wifi,
  Update,
  VolumeUp,
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
  saveSettings,
  fetchSettings,
  selectLoading,
  selectFetchingInterval,
  selectIsFetchingEnabled,
  selectNotificationSoundVolume,
  selectIsNotificationSoundEnabled,
} from '../../../../store/settings';

import { useAppDispatch, useAppSelector } from '../../../../hooks/store';
import { fetchingIntervalOptions } from '../../../../store/settings/types';

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const isFetchingEnabled = useAppSelector(selectIsFetchingEnabled);
  const fetchingInterval = useAppSelector(selectFetchingInterval);
  const isLoading = useAppSelector(selectLoading);

  const isNotificationSoundEnabled = useAppSelector(
    selectIsNotificationSoundEnabled
  );

  const notificationSoundVolume = useAppSelector(selectNotificationSoundVolume);

  const [volumeLevel, setVolumeLevel] = useState(notificationSoundVolume);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(
    () => setVolumeLevel(notificationSoundVolume),
    [notificationSoundVolume]
  );

  return (
    <Card>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <Wifi />
            </ListItemIcon>
            <ListItemText>Enable fetching</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                color="primary"
                checked={isFetchingEnabled}
                disabled={isLoading}
                onChange={(e) =>
                  dispatch(
                    saveSettings({ isFetchingEnabled: e.target.checked })
                  )
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
                  dispatch(
                    saveSettings({ fetchingInterval: e.target.value as number })
                  )
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
                  dispatch(
                    saveSettings({
                      isNotificationSoundEnabled: e.target.checked,
                    })
                  )
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
                value={volumeLevel}
                onChange={(e, value) => setVolumeLevel(value as number)}
                onChangeCommitted={(e, value) =>
                  dispatch(
                    saveSettings({
                      notificationSoundVolume: value as number,
                    })
                  )
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
