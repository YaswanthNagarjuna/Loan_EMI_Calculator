import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { mode, toggleTheme } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Exchange Rates (Live)', to: '/exchange_rates_live' },
    { label: 'Error Page', to: '/error_page' }
  ];

  const drawer = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer}>
      <Typography variant="h6" sx={{ p: 2 }}>Navigation</Typography>
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.to}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Loan Calculator
          </Typography>

          {isMobile ? (
            <Switch checked={mode === 'dark'} onChange={toggleTheme} />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navLinks.map((item) => (
                <Button key={item.label} color="inherit" component={Link} to={item.to}>
                  {item.label}
                </Button>
              ))}
              <Switch checked={mode === 'dark'} onChange={toggleTheme} />
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
