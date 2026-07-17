const { mongoose } = require('../db');

const orderItemSchema = new mongoose.Schema({
  sku: String,
  quantity: Number,
  priceCents: Number
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: String,
  status: String,
  createdAt: Date,
  items: [orderItemSchema]
}, { collection: 'orders' });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

async function listRecentOrders(userId) {
  return Order.find({ userId })
    .sort({ createdAt: -1 })
    .limit(25)
    .lean();
}

async function findOrderWithItems(orderId, userId) {
  return Order.findOne({ _id: orderId, userId }).lean();
}

module.exports = {
  listRecentOrders,
  findOrderWithItems
};
