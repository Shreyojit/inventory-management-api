

import { createCustomer, getCustomerById, getCustomers } from "@/controllers/customer-controller";
import express from "express";
const customerRouter = express.Router();



// Create a new customer
customerRouter.post("/", createCustomer);

// Get all customers
customerRouter.get("/", getCustomers);

// Get a customer by ID
customerRouter.get("/:id", getCustomerById);

export default customerRouter;