const Order = require("../models/order.models");
const Product = require("../models/product.models");

exports.orders_get_all_orders = (req, res) => {
  Order.find()
    .exec()
    .then((order) => {
      res.status(200).json({
        total: order.length,
        orders: order,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err.message,
      });
    });
};

exports.orders_create_order = (req, res) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          err: "Product does not exist !",
        });
      } else {
        const order = new Order({
          product: productId,
          quantity: req.body.quantity,
          user: req.user.userId,
        });
        return order.save().then((order) => {
          res.status(201).json({
            message: "Order Created",
            order,
          });
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.orders_get_order = (req, res) => {
  const { orderId } = req.params;
  Order.findOne({ _id: orderId })
    .populate("product", "name productImage price")
    .populate("user", "_id name email role")
    .exec()
    .then((order) => {
      if (!order) {
        res.status(404).json({
          err: "This order does not exist",
        });
      } else {
        res.status(200).json({
          message: "Order Found",
          order,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.users_delete_user_profile_order = (req, res) => {
  const { orderId } = req.params;
  const { userId } = req.user;
  Order.deleteOne({ $and: [{ _id: orderId }, { user: userId }] })
    .exec()
    .then((order) => {
      res.status(200).json({ message: "Order deleted successfully", order });
    })
    .catch((err) => {
      res.status(400).json({ err: err.message });
    });
};

exports.orders_delete_any_order = (req, res) => {
  const { orderId } = req.params;
  Order.deleteOne({ _id: orderId })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Order Deleted succesfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        err: err.message,
      });
    });
};

exports.users_get_user_profile_orders = (req, res) => {
  const { userId } = req.user;
  Order.find({ user: userId })
    .exec()
    .then((order) => {
      res.status(200).json({ message: "All your orders", orders: order });
    })
    .catch((err) => {
      err: err.message;
    });
};
