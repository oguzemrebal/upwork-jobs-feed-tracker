import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';

import theme from '../../theme';
import Popup from '../../pages/Popup/Popup';
import Options from '../../pages/Options/Options';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline>
      <Router hashType="noslash">
        <Switch>
          <Route path="/popup" component={Popup} />
          <Route path="/options" component={Options} />
        </Switch>
      </Router>
    </CssBaseline>
  </MuiThemeProvider>
);

export default App;
