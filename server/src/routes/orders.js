const express = require('express');

const { findOrderWithItems, listRecentOrders } = require('../repositories/orderRepo');

const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await listRecentOrders(req.user.id);
  res.json({ orders });
});

router.get('/:orderId', async (req, res) => {
  const order = await findOrderWithItems(req.params.orderId, req.user.id);

  if (!order) {
    throw new Error('Order not found');
  }

  res.json({ order });
});

module.exports = router;
