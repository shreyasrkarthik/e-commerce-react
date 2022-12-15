import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";

import "../css/Orders.css";
import { Delete, DeleteForever, ExpandMore } from "@mui/icons-material";

const Orders = ({
  open,
  orders,
  handleClose,
  removeFromCart,
  pastOrders,
  orderNow,
  deleteOrder,
}) => {
  const createOrderCards = (arr) =>
    arr.map((order) => (
      <Card key={order._id} className="order-card">
        <CardContent>
          <div className="order-flex-box">
            <Typography variant="body1">{order.name}</Typography>
            <div className="order-card-left">
              <Typography variant="body1">${order.price}</Typography>
              <IconButton onClick={() => removeFromCart(order)}>
                <Delete color="error" />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </Card>
    ));

  const createPastOrderCards = (arr) =>
    arr.map((order) => (
      <Card key={order._id} className="order-card">
        <CardContent>
          <div className="order-flex-box">
            <div>
              <Typography variant="subtitle2" color="text.secondary">
                {order.orderedDate}
              </Typography>
              <Typography variant="body1">Name: {order.productName}</Typography>
              <Typography variant="subtitle2">
                Quantity: {order.quantity}
              </Typography>
              <Typography variant="subtitle2">Total: {order.total}</Typography>
              <Typography variant="caption" color="text.secondary">
                Status: {order.orderStatus}
              </Typography>
            </div>
            {order.orderStatus !== "DELIVERED" && (
              <IconButton
                variant="contained"
                color="error"
                onClick={() => deleteOrder(order._id)}
              >
                <DeleteForever />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
    ));

  return (
    <Dialog open={open} className="orders" onClose={handleClose}>
      <DialogTitle>Cart</DialogTitle>
      <DialogContent>
        <Accordion className="cart-accordion">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Current Orders</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {orders.size > 0 ? (
              <div>
                {createOrderCards(Array.from(orders))}
                <Button
                  variant="contained"
                  className="order-btn"
                  onClick={orderNow}
                >
                  Order now
                </Button>
              </div>
            ) : (
              <div>No orders here!</div>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion className="cart-accordion">
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Past Orders</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {pastOrders.length > 0 ? (
              createPastOrderCards(pastOrders)
            ) : (
              <div>No orders here!</div>
            )}
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};

export default Orders;
