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
  setSettings,
  selectFetchingInterval,
  selectIsFetchingEnabled,
  selectNotificationSoundVolume,
  selectIsNotificationSoundEnabled,
} from '../../store/settings';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchingIntervalOptions } from '../../store/settings/types';

const OptionSidebar = () => {
  const dispatch = useAppDispatch();

  const isFetchingEnabled = useAppSelector(selectIsFetchingEnabled);
  const fetchingInterval = useAppSelector(selectFetchingInterval);

  const isNotificationSoundEnabled = useAppSelector(
    selectIsNotificationSoundEnabled
  );

  const notificationSoundVolume = useAppSelector(selectNotificationSoundVolume);

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
                onChange={(e) =>
                  dispatch(setSettings({ isFetchingEnabled: e.target.checked }))
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
                onChange={(e) =>
                  dispatch(setSettings({ fetchingInterval: e.target.value }))
                }
              >
                {fetchingIntervalOptions.map((interval) => (
                  <MenuItem value={1} key={`interval-${interval}`}>
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
                onChange={(e) =>
                  dispatch(
                    setSettings({
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
                disabled={!isNotificationSoundEnabled}
                onChange={(event, value: number | number[]) =>
                  dispatch(setSettings({ notificationSoundVolume: value }))
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
