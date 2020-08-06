const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const checkAdmin = require("../auth/check-admin");
const {
  orders_get_all_orders,
  orders_create_order,
  orders_get_order,
  orders_delete_any_order,
} = require("../controller/order.controller");

//route to get all orders (admin priviledges only)
router.get("/", checkAuth, checkAdmin, orders_get_all_orders);

//route to create an order (purchase a product)
router.post("/products/:productId", checkAuth, orders_create_order);

//route to get an order
router.get("/:orderId", checkAuth, orders_get_order);

//route to delete any order (admin priviledges only)
router.delete("/:orderId", checkAuth, checkAdmin, orders_delete_any_order);

module.exports = router;
