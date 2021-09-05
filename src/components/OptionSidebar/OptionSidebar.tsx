import {
  Card,
  List,
  Switch,
  Select,
  Divider,
  MenuItem,
  ListItem,
  CardContent,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';

const OptionSidebar = () => (
  <Card>
    <CardContent>
      <List>
        <ListItem>
          <ListItemText>Enable fetching</ListItemText>
          <ListItemSecondaryAction>
            <Switch color="primary" />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider component="li" style={{ margin: '8px 0' }} />

        <ListItem>
          <ListItemText>Fetch interval</ListItemText>
          <ListItemSecondaryAction>
            <Select>
              <MenuItem>1 minute</MenuItem>
              <MenuItem>5 minutes</MenuItem>
              <MenuItem>10 minutes</MenuItem>
            </Select>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemText>Notification sound</ListItemText>
          <ListItemSecondaryAction>
            <Switch color="primary" />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </CardContent>
  </Card>
);

export default OptionSidebar;
