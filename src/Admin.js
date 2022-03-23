import React, { useContext, useEffect, useState } from 'react';
import { MainCtx } from './index';
import { GetOrders } from './firestore';
import { Paper, Grid, Button, Divider } from '@mui/material';

const Admin = () => {
  const { db } = useContext(MainCtx);

  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  const { data } = GetOrders({ db });

  useEffect(() => {
    // console.log({ data });
    setOrders(data);
  }, [data]);

  const handleStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Void':
        return 'red';
      case 'Preparing':
        return '#1976d2';
      case 'For Delivery':
        return '#2e7d32';

      default:
        break;
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {orders
        .sort((a, b) => b.date_created.localeCompare(a.date_created))
        .map((order) => {
          const { cart, customer, id, status } = order;
          return (
            <Paper key={id} sx={{ p: 2, mt: 2 }}>
              <strong>{customer?.name}</strong>
              <small style={{ display: 'block' }}>
                Address: <strong>{customer?.address}</strong>
              </small>
              <small style={{ display: 'block' }}>
                Payment Method: <strong>{customer?.payment_method}</strong>
              </small>

              <small>
                Status:{' '}
                <strong style={{ color: handleStatus(status) }}>
                  {status}
                </strong>
              </small>

              <Divider sx={{ mt: 1 }} />

              <section
                style={{
                  // marginTop: 10,
                  paddingTop: 10,
                  // borderTop: "1px solid #000"
                }}
              >
                {cart.map((item) => {
                  return (
                    <section style={{ marginBottom: 10 }}>
                      <strong>{item.name}</strong>
                      <div>
                        <small>Qty: {item.quantity}</small>
                      </div>
                    </section>
                  );
                })}
              </section>

              <Divider sx={{ mt: 1, mb: 2 }} />

              <Grid container spacing={1} fullWidth>
                <Grid item={4}>
                  <Button
                    disableElevation
                    variant='contained'
                    size='small'
                    color='inherit'
                    onClick={() => setOrderStatus('Void')}
                  >
                    Void
                  </Button>
                </Grid>
                <Grid item={4}>
                  <Button
                    disableElevation
                    variant='contained'
                    size='small'
                    color='primary'
                    onClick={() => setOrderStatus('Preparing')}
                  >
                    Preparing
                  </Button>
                </Grid>
                <Grid item={4}>
                  <Button
                    disableElevation
                    variant='contained'
                    size='small'
                    color='success'
                    onClick={() => setOrderStatus('For Delivery')}
                  >
                    For Delivery
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          );
        })}

      {/* <section>
			Name: {orders.userInfo}
		</section> */}
    </div>
  );
};

export default Admin;
