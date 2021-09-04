import { Route, Switch, HashRouter as Router } from 'react-router-dom';

const App = () => (
  <Router hashType="noslash">
    <Switch>
      <Route path="/options">options</Route>
      <Route path="/popup">popup</Route>
    </Switch>
  </Router>
);

export default App;
