import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';

import theme from '../../theme';
import Popup from '../../pages/Popup/Popup';
import Options from '../../pages/Options/Options';

const pages = [
  { path: '/popup', component: Popup },
  { path: '/options', component: Options },
];

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>
      <Router hashType="noslash">
        <Switch>
          {pages.map(({ path, component }) => (
            <Route key={`page-${path}`} path={path} component={component} />
          ))}
        </Switch>
      </Router>
    </CssBaseline>
  </MuiThemeProvider>
);

export default App;
