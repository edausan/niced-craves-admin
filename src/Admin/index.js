import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Chip,
  SwipeableDrawer,
} from '@mui/material';
import Orders from './Orders';
import { GetOrders } from '../firestore';
import Swipeable from './Swipeable';

export const handleColor = (status) => {
  console.log({ status });
  switch (status) {
    case 'Pending':
      return 'warning.main';
    case 'Preparing':
      return 'secondary.main';
    case 'For Delivery':
      return 'primary.main';
    case 'Completed':
      return '#2e7d32';
    case 'Cancelled':
      return 'text.disabled';

    default:
      break;
  }
};

export const STATUS = [
  'Pending',
  'Preparing',
  'For Delivery',
  'Completed',
  'Cancelled',
];

const AdminIndex = () => {
  const { data } = GetOrders();

  const [value, setValue] = useState(0);
  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  useEffect(() => {
    console.log({ value });
  }, [value]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        background: '#eee',
        minHeight: '100vh',
        maxWidth: 500,
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'fixed',
          top: 0,
          left: '50%',
          zIndex: 9,
          boxShadow: '0 5px 10px rgba(0,0,0,.2)',
          width: '100%',
          maxWidth: 500,
          transform: 'translateX(-50%)',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          allowScrollButtonsMobile
          variant='scrollable'
          scrollButtons='auto'
          sx={{ bgcolor: '#fff' }}
        >
          {STATUS.map((stat, idx) => (
            <Tab
              key={idx}
              label={stat}
              {...a11yProps(idx)}
              iconPosition='start'
              icon={
                <Chip
                  size='small'
                  sx={{ bgcolor: handleColor(stat), color: '#fff' }}
                  label={data.filter((order) => order.status === stat).length}
                />
              }
            />
          ))}
        </Tabs>
      </Box>

      <Swipeable index={value} setIndex={setValue}>
        {STATUS.map((stat, idx) => (
          <TabPanel
            key={idx}
            value={value}
            index={idx}
            sx={{ minHeight: '100vh' }}
          >
            <Orders orderStatus={stat} />
          </TabPanel>
        ))}
      </Swipeable>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default AdminIndex;
