const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Order", OrderSchema);
