const mongoose = require("mongoose");

const role = require("../auth/role");

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [role.ADMIN, role.COSTUMER],
    default: role.COSTUMER,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
