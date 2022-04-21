import React, {useContext, useEffect, useState} from "react"
import {MainCtx} from "../index"
import {GetOrders, UpdateOrder} from "../firestore"
import {
	Paper,
	Grid,
	Button,
	Divider,
	Typography,
	Chip,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Collapse
} from "@mui/material"
import {GetToken} from "../firebase"
import {
	AutorenewOutlined,
	CancelOutlined,
	CheckCircleOutlined,
	DirectionsBikeOutlined,
	Restaurant,
	ExpandLess,
	ExpandMore,
	AccountCircle
} from "@mui/icons-material"
import moment from "moment"
import {handleColor} from "."
import {grey} from "@mui/material/colors"

const Orders = ({orderStatus}) => {
	const [orderId, setOrderId] = useState("")
	const [status, setStatus] = useState({col: null, value: null})
	const [orders, setOrders] = useState([])
	const [open, setOpen] = useState({status: false, id: null})

	const {updateOrder} = UpdateOrder({id: orderId, params: status})
	const {data} = GetOrders()

	useEffect(() => {
		GetToken()
		setOrders(data)
	}, [data])

	const handleStatus = status => {
		switch (status) {
			case "Pending":
				return "orange"
			case "Cancelled":
				return "inherit"
			case "Preparing":
				return "secondary"
			case "For Delivery":
				return "primary"
			case "Completed":
				return "success"

			default:
				break
		}
	}

	useEffect(() => {
		console.log({open})
	}, [open])

	const isEven = n => {
		return n % 2 === 0
	}

	const handleSelectedSize = (selected_price, item) => {
		return item.sizes.filter(s => s.price === selected_price)[0]
	}

	return (
		<div style={{paddingTop: 70, minHeight: "100vh"}}>
			{orders
				.filter(order => order.status === orderStatus)
				.map(order => {
					const {cart, customer, id, status, total} = order
					console.log({id})
					return (
						<Paper key={id} sx={{p: 2, mb: 2}}>
							<small>
								<small>{moment(order.date_created).calendar()} | </small>
								<Typography variant="caption" component="small" color="orangered">
									<small>
										<i>{moment(order.date_created).startOf(order.date_created).fromNow()}</i>
									</small>
								</Typography>
							</small>
							<Typography color={handleColor(status)} variant="subtitle2" sx={{float: "right"}}>
								<small>
									<strong>{status}</strong>
								</small>
							</Typography>
							{/* <Divider sx={{mt: 1}} /> */}

							<ListItemButton
								sx={{pl: 1, pr: 1, background: open.status && open.id === id ? grey["200"] : "inherit", width: "100%"}}
								onClick={() => setOpen({status: !open.status, id})}
							>
								<ListItemIcon sx={{minWidth: 35}}>
									<AccountCircle />
								</ListItemIcon>
								<ListItemText primary={customer?.name} />
								{open.status && open.id === id ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={open.status && open.id === id} timeout="auto" unmountOnExit>
								<small style={{color: "#999"}}>Address</small>
								<Typography variant="subtitle2">
									<small>
										<strong>{customer?.address}</strong>
									</small>
								</Typography>

								<small style={{color: "#999"}}>House/Gate Color</small>
								<Typography variant="subtitle2">
									<small>
										<strong>{customer?.house_color}</strong>
									</small>
								</Typography>

								<small style={{color: "#999"}}>Delivery Address</small>
								<Typography variant="subtitle2">
									<small>
										<strong>
											{customer?.delivery.name} - ₱{customer?.delivery.price}
										</strong>
									</small>
								</Typography>

								<small style={{color: "#999"}}>Landmark</small>
								<Typography variant="subtitle2">
									<small>
										<strong>{customer?.landmark}</strong>
									</small>
								</Typography>

								<small style={{color: "#999"}}>Payment Method</small>
								<Typography variant="subtitle2">
									<small>
										<strong>{customer?.payment_method}</strong>
									</small>
								</Typography>
							</Collapse>

							<Grid container alignItems="center" sx={{mt: 2}}>
								<Grid item xs={1}>
									<small style={{color: "#999"}}>Items</small>
								</Grid>
								<Grid item xs={11} sx={{mt: 1, pl: 1}}>
									<Divider />
								</Grid>
							</Grid>

							<section
								style={{
									// padding: 10,
									marginTop: 10,
									// background: '#eee5',
									borderRadius: 5
								}}
							>
								{cart.map((item, idx) => {
									console.log({cart})
									return (
										<Grid
											key={idx}
											container
											sx={{
												bgcolor: isEven(idx) ? "#ffeada" : "#fffcf9",
												p: 1
											}}
										>
											<Grid item xs={6}>
												<small>
													<strong>{item.name}</strong>
												</small>

												{item.flavor && (
													<div>
														<div>
															<small>{item.flavor}</small>
														</div>
														{item.add_on && (
															<small>
																<i>add on: {item.add_on}</i>
															</small>
														)}
													</div>
												)}
											</Grid>
											<Grid item xs={3}>
												{item.sizes?.length > 1 && (
													<div>
														<small>{handleSelectedSize(item.selected_price, item).name}</small>
													</div>
												)}
											</Grid>
											<Grid item xs={2}>
												<small>
													<strong>x {item.quantity}</strong>
												</small>
											</Grid>
											<Grid item xs={1}>
												<small>₱{item.selected_price * item.quantity}</small>
											</Grid>
										</Grid>
									)
								})}

								<Divider sx={{mt: 2, mb: 1}} />
								<Grid container>
									<Grid item xs={10}>
										<strong>Total</strong>
									</Grid>
									<Grid item xs={2}>
										<strong>₱{total}</strong>
									</Grid>
								</Grid>
							</section>

							{orderStatus !== "Completed" && orderStatus !== "Cancelled" && (
								<>
									<Divider sx={{mt: 1, mb: 2}} />
									<Grid container spacing={1}>
										<Grid item xs={3}>
											<Button
												fullWidth
												disableElevation
												variant="contained"
												size="small"
												color="inherit"
												disabled={orderStatus === "Cancelled"}
												onClick={() => {
													setStatus({col: "status", value: "Cancelled"})
													setOrderId(order.id)
												}}
											>
												<CancelOutlined />
											</Button>
										</Grid>
										<Grid item xs={3}>
											<Button
												fullWidth
												disableElevation
												variant="contained"
												size="small"
												color="secondary"
												disabled={orderStatus === "Preparing"}
												onClick={() => {
													setStatus({col: "status", value: "Preparing"})
													setOrderId(order.id)
												}}
											>
												<Restaurant />
											</Button>
										</Grid>

										<Grid item xs={3}>
											<Button
												fullWidth
												disableElevation
												variant="contained"
												size="small"
												color="primary"
												disabled={orderStatus === "For Delivery"}
												onClick={() => {
													setStatus({col: "status", value: "For Delivery"})
													setOrderId(order.id)
												}}
											>
												<DirectionsBikeOutlined />
											</Button>
										</Grid>

										<Grid item xs={3}>
											<Button
												fullWidth
												disableElevation
												variant="contained"
												size="small"
												color="success"
												disabled={orderStatus === "Completed"}
												onClick={() => {
													setStatus({col: "status", value: "Completed"})
													setOrderId(order.id)
												}}
											>
												<CheckCircleOutlined />
											</Button>
										</Grid>
									</Grid>
								</>
							)}
						</Paper>
					)
				})}

			{/* <section>
			Name: {orders.userInfo}
		</section> */}
		</div>
	)
}

export default Orders
