const express = require("express");
const router = express.Router();

const checkAuth = require("../auth/check-auth");
const checkAdmin = require("../auth/check-admin");
const {
  users_get_all_users,
  users_register_user,
  users_get_user_profile,
  users_get_any_user,
  users_delete_any_user,
  users_delete_user_profile,
  users_update_user_profile,
  users_update_user_profile_password,
  users_login_user,
} = require("../controller/user.controller");
const {
  users_get_user_profile_orders,
  users_delete_user_profile_order,
} = require("../controller/order.controller");

//route to get all users (admin priviledges only)
router.get("/", checkAuth, checkAdmin, users_get_all_users);

//route to register a user
router.post("/register", users_register_user);

//route to login a user
router.post("/login", users_login_user);

//route to get user profile
router.get("/profile", checkAuth, users_get_user_profile);

//route to delete user profile
router.delete("/profile", checkAuth, users_delete_user_profile);

//route to update user profile
router.patch("/profile", checkAuth, users_update_user_profile);

//route to update user profile password
router.patch(
  "/profile/password",
  checkAuth,
  users_update_user_profile_password
);

//route to get all user profile orders
router.get("/profile/orders", checkAuth, users_get_user_profile_orders);

//route to delete user profile orders
router.delete(
  "/profile/orders/:orderId",
  checkAuth,
  users_delete_user_profile_order
);

//route to find/get any user (admin priviledges only)
router.get("/:userId", checkAuth, checkAdmin, users_get_any_user);

//route to delete any user (only admin priviledges)
router.delete("/:userId", checkAuth, checkAdmin, users_delete_any_user);

module.exports = router;
