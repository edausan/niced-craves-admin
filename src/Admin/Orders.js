import React, { useContext, useEffect, useState } from 'react';
import { MainCtx } from '../index';
import { GetOrders, UpdateOrder } from '../firestore';
import { Paper, Grid, Button, Divider, Typography, Chip } from '@mui/material';
import { GetToken } from '../firebase';
import {
  AutorenewOutlined,
  CancelOutlined,
  CheckCircleOutlined,
  DirectionsBikeOutlined,
  Restaurant,
} from '@mui/icons-material';
import moment from 'moment';
import { handleColor } from '.';

const Orders = ({ orderStatus }) => {
  console.log({ orderStatus });
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState({ col: null, value: null });
  const [orders, setOrders] = useState([]);

  const { updateOrder } = UpdateOrder({ id: orderId, params: status });
  const { data } = GetOrders();

  useEffect(() => {
    GetToken();
    // console.log({ data });
    setOrders(data);
  }, [data]);

  const handleStatus = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Cancelled':
        return 'inherit';
      case 'Preparing':
        return 'secondary';
      case 'For Delivery':
        return 'primary';
      case 'Completed':
        return 'success';

      default:
        break;
    }
  };

  const isEven = (n) => {
    return n % 2 === 0;
  };

  return (
    <div style={{ paddingTop: 70 }}>
      {orders
        .filter((order) => order.status === orderStatus)
        // .sort((a, b) => b.date_created.localeCompare(a.date_created))
        .map((order) => {
          const { cart, customer, id, status } = order;
          return (
            <Paper key={id} sx={{ p: 2, mb: 2 }}>
              <small>
                {moment(order.date_created).calendar()} |{' '}
                <Typography
                  variant='caption'
                  component='small'
                  color='orangered'
                >
                  <i>
                    {moment(order.date_created)
                      .startOf(order.date_created)
                      .fromNow()}
                  </i>
                </Typography>
              </small>
              <Typography
                color={handleColor(status)}
                variant='subtitle2'
                sx={{ float: 'right' }}
              >
                <small>
                  <strong>{status}</strong>
                </small>
              </Typography>
              <Divider sx={{ mt: 1 }} />
              <small style={{ color: '#999' }}>Name</small>
              <Typography variant='subtitle1'>
                <small>
                  <strong>{customer?.name}</strong>
                </small>
              </Typography>

              <small style={{ color: '#999' }}>Address</small>
              <Typography variant='subtitle2'>
                <small>
                  <strong>{customer?.address}</strong>
                </small>
              </Typography>

              <small style={{ color: '#999' }}>Payment Method</small>
              <Typography variant='subtitle2'>
                <small>
                  <strong>{customer?.payment_method}</strong>
                </small>
              </Typography>

              <Grid container alignItems='center' sx={{ mt: 2 }}>
                <Grid item xs={1}>
                  <small style={{ color: '#999' }}>Items</small>
                </Grid>
                <Grid item xs={11} sx={{ mt: 1, pl: 1 }}>
                  <Divider />
                </Grid>
              </Grid>

              <section
                style={{
                  // padding: 10,
                  marginTop: 10,
                  // background: '#eee5',
                  borderRadius: 5,
                }}
              >
                {cart.map((item, idx) => {
                  return (
                    <Grid
                      container
                      sx={{
                        bgcolor: isEven(idx) ? '#ffeada' : '#fff',
                        p: 1,
                      }}
                    >
                      <Grid item xs={11}>
                        <small>
                          <strong>{item.name}</strong>
                        </small>
                      </Grid>
                      <Grid item xs={1}>
                        <small>x {item.quantity}</small>
                      </Grid>
                    </Grid>
                  );
                })}
              </section>

              {orderStatus !== 'Completed' && (
                <>
                  <Divider sx={{ mt: 1, mb: 2 }} />
                  <Grid container spacing={1}>
                    <Grid item xs={3}>
                      <Button
                        fullWidth
                        disableElevation
                        variant='contained'
                        size='small'
                        color='inherit'
                        disabled={orderStatus === 'Cancelled'}
                        onClick={() => {
                          setStatus({ col: 'status', value: 'Cancelled' });
                          setOrderId(order.id);
                        }}
                      >
                        <CancelOutlined />
                      </Button>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        fullWidth
                        disableElevation
                        variant='contained'
                        size='small'
                        color='secondary'
                        disabled={orderStatus === 'Preparing'}
                        onClick={() => {
                          setStatus({ col: 'status', value: 'Preparing' });
                          setOrderId(order.id);
                        }}
                      >
                        <Restaurant />
                      </Button>
                    </Grid>

                    <Grid item xs={3}>
                      <Button
                        fullWidth
                        disableElevation
                        variant='contained'
                        size='small'
                        color='primary'
                        disabled={orderStatus === 'For Delivery'}
                        onClick={() => {
                          setStatus({ col: 'status', value: 'For Delivery' });
                          setOrderId(order.id);
                        }}
                      >
                        <DirectionsBikeOutlined />
                      </Button>
                    </Grid>

                    <Grid item xs={3}>
                      <Button
                        fullWidth
                        disableElevation
                        variant='contained'
                        size='small'
                        color='success'
                        disabled={orderStatus === 'Completed'}
                        onClick={() => {
                          setStatus({ col: 'status', value: 'Completed' });
                          setOrderId(order.id);
                        }}
                      >
                        <CheckCircleOutlined />
                      </Button>
                    </Grid>
                  </Grid>
                </>
              )}
            </Paper>
          );
        })}

      {/* <section>
			Name: {orders.userInfo}
		</section> */}
    </div>
  );
};

export default Orders;
