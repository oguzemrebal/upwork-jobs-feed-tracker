import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, AppBar, Toolbar, Container } from '@material-ui/core';

import logo from '../../assets/images/logo.svg';

const sections = [
  { to: '/options', label: 'My feed' },
  { to: '/options/cover-letter', label: 'Cover letter' },
];

const Header = () => (
  <AppBar elevation={0} position="static" style={{ background: '#242c38' }}>
    <Container maxWidth="md">
      <Toolbar disableGutters>
        <Box mr={4} pt={1}>
          <img src={logo} alt="UpToolkit" height="30" />
        </Box>

        {sections.map(({ to, label }) => (
          <Box px={4} key={`section-${to}`}>
            <Link
              to={to}
              variant="body1"
              color="textPrimary"
              component={RouterLink}
            >
              <strong>{label}</strong>
            </Link>
          </Box>
        ))}
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
