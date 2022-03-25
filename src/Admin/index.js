import React, { useState, cloneElement } from 'react';
import { Box, Tabs, Tab, Typography, Chip } from '@mui/material';
import Orders from './Orders';
import { GetOrders } from '../firestore';

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

const AdminIndex = () => {
  const { data } = GetOrders();

  const STATUS = [
    'Pending',
    'Preparing',
    'For Delivery',
    'Completed',
    'Cancelled',
  ];
  const [value, setValue] = useState(0);
  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ background: '#eee', minHeight: '100vh' }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9,
          boxShadow: '0 5px 10px rgba(0,0,0,.2)',
          width: '100%',
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

      {STATUS.map((stat, idx) => (
        <TabPanel key={idx} value={value} index={idx}>
          <Orders orderStatus={stat} />
        </TabPanel>
      ))}
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
