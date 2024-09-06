// models/Customer.js
const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({
  prefix: { type: String },
  firstName: {
    type: String,
    equired: true,
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
  },
  suffix: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: String },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
