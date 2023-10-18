import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import classes from './App.module.css'
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function VerticalTabs() {

  return (
    <BrowserRouter>
      <Box className={classes.container}>
        <Tabs orientation="vertical" variant="scrollable" className={classes.tabStyle}>
          <Tab label={<Link to="/">Home</Link>} />
          <Tab label={<Link to="/profile">Profile</Link>} />
          <Tab label={<Link to="/setting">Setting</Link>} />
        </Tabs>
        <TabPanel value={0} index={0} className={classes.tabPanelStyle}>
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/profile" Component={Profile} />
            <Route path="/setting" Component={Setting} />
          </Routes>
        </TabPanel>
      </Box>
    </BrowserRouter>
  );
}
