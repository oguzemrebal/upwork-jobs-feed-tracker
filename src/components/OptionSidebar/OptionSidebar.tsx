import { useEffect } from 'react';

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
  selectSettingsLoading,
  selectFetchingInterval,
  selectIsFetchingEnabled,
  selectNotificationSoundVolume,
  selectIsNotificationSoundEnabled,
} from '../../store/settings';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchingIntervalOptions } from '../../store/settings/types';

const OptionSidebar = () => {
  const dispatch = useAppDispatch();

  const isSettingsLoading = useAppSelector(selectSettingsLoading);
  const isFetchingEnabled = useAppSelector(selectIsFetchingEnabled);
  const fetchingInterval = useAppSelector(selectFetchingInterval);

  const isNotificationSoundEnabled = useAppSelector(
    selectIsNotificationSoundEnabled
  );

  const notificationSoundVolume = useAppSelector(selectNotificationSoundVolume);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

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
                disabled={isSettingsLoading}
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
                disabled={isSettingsLoading}
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
                disabled={isSettingsLoading}
                checked={isNotificationSoundEnabled}
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
                value={notificationSoundVolume}
                disabled={!isNotificationSoundEnabled || isSettingsLoading}
                onChange={(e, value) =>
                  dispatch(
                    saveSettings({ notificationSoundVolume: value as number })
                  )
                }
              />
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default OptionSidebar;
