// routes/customers.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const router = express.Router();

// Create customer
router.post("/create", async (req, res) => {
  const { prefix, firstName, middleName, lastName, suffix, email, phone } =
    req.body;

  try {
    // Check if email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already in use" });
    }
    // Create new customer with all fields
    const customer = new Customer({
      prefix,
      firstName,
      middleName,
      lastName,
      suffix,
      email,
      phone,
    });

    // Save the customer
    await customer.save();

    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ error: "Error creating customer" });
  }
});

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching customers" });
  }
});

// Get customer by email
router.get("/email/:email", async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.params.email });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update customer
router.put("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ error: "Error updating customer" });
  }
});

// Delete customer
router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ error: "Customer not found" });
    res.status(200).json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting customer" });
  }
});

module.exports = router;
