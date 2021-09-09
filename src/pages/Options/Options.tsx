import { Box } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';

import Feed from './Feed/Feed';
import CoverLetter from './CoverLetter/CoverLetter';
import Header from '../../components/Header/Header';
import Container from '../../components/Container/Container';

const pages = [
  { path: '/options', component: Feed },
  { path: '/options/cover-letter', component: CoverLetter },
];

const Options = () => (
  <Container maxWidth={false} disableGutters>
    <Header />

    <Container>
      <Box py={3}>
        <Switch>
          {pages.map(({ path, component }) => (
            <Route
              exact
              path={path}
              component={component}
              key={`options-section-${path}`}
            />
          ))}
        </Switch>
      </Box>
    </Container>
  </Container>
);

export default Options;
