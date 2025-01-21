import { db } from "@/db/db";
import { Request, Response } from "express";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const {
      customerType,
      firstName,
      lastName,
      phone,
      gender,
      maxCreditLimit,
      maxCreditDays,
      taxPin,
      dob,
      email,
      nationalID,
      country,
      location,
    } = req.body;

    // Input validation
    if (!customerType || !firstName || !lastName || !phone || !gender || !maxCreditLimit || !maxCreditDays || !country || !location) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Create new customer
    const customer = await db.customer.create({
      data: {
        customerType,
        firstName,
        lastName,
        phone,
        gender,
        maxCreditLimit,
        maxCreditDays,
        taxPin,
        dob: dob ? new Date(dob) : undefined, // Convert to Date object if provided
        email,
        nationalID,
        country,
        location,
      },
    });

    return res.status(201).json(customer);
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ message: "Failed to create customer." });
  }
};

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await db.customer.findMany();
    return res.status(200).json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return res.status(500).json({ message: "Failed to fetch customers." });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const customer = await db.customer.findUnique({
      where: { id },
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    return res.status(500).json({ message: "Failed to fetch customer." });
  }
};

