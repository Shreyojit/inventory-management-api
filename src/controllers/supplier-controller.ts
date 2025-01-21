import { db } from "@/db/db";
import { Request, Response } from "express";

// Create a new supplier
export const createSupplier = async (req: Request, res: Response) => {
    try {
      const {
        supplierType,
        name,
        contactPerson,
        phone,
        email,
        location,
        country,
        website,
        taxPin,
        registrationNumber,
        bankAccountNumber,
        bankName,
        paymentTerms,
        logo,
        rating,
        notes,
      } = req.body;
  
      // Input validation
      if (!supplierType || !name || !contactPerson || !phone || !location || !country) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      // Check for existing supplier by phone
      const existingSupplierByPhone = await db.supplier.findUnique({
        where: { phone },
      });
  
      if (existingSupplierByPhone) {
        return res
          .status(409)
          .json({ message: "A supplier with this phone number already exists." });
      }
  
      // Check for existing supplier by email (if provided)
      if (email) {
        const existingSupplierByEmail = await db.supplier.findUnique({
          where: { email },
        });
  
        if (existingSupplierByEmail) {
          return res
            .status(409)
            .json({ message: "A supplier with this email address already exists." });
        }
      }
  
      // Check for existing supplier by registration number (if provided)
      if (registrationNumber) {
        const existingSupplierByRegistrationNumber = await db.supplier.findUnique({
          where: { registrationNumber },
        });
  
        if (existingSupplierByRegistrationNumber) {
          return res
            .status(409)
            .json({ message: "A supplier with this registration number already exists." });
        }
      }
  
      // Create a new supplier
      const supplier = await db.supplier.create({
        data: {
          supplierType,
          name,
          contactPerson,
          phone,
          email,
          location,
          country,
          website,
          taxPin,
          registrationNumber,
          bankAccountNumber,
          bankName,
          paymentTerms,
          logo,
          rating,
          notes,
        },
      });
  
      return res.status(201).json(supplier);
    } catch (error) {
      console.error("Error creating supplier:", error);
      return res.status(500).json({ message: "Failed to create supplier." });
    }
  };
  

// Get all suppliers
export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await db.supplier.findMany();
    return res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return res.status(500).json({ message: "Failed to fetch suppliers." });
  }
};

// Get a single supplier by ID
export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const supplier = await db.supplier.findUnique({
      where: { id },
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    return res.status(200).json(supplier);
  } catch (error) {
    console.error("Error fetching supplier by ID:", error);
    return res.status(500).json({ message: "Failed to fetch supplier." });
  }
};

// Update a supplier
export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Update supplier
    const updatedSupplier = await db.supplier.update({
      where: { id },
      data,
    });

    return res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error("Error updating supplier:", error);
    return res.status(500).json({ message: "Failed to update supplier." });
  }
};

// Delete a supplier
export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete supplier
    await db.supplier.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Supplier deleted successfully." });
  } catch (error) {
    console.error("Error deleting supplier:", error);
    return res.status(500).json({ message: "Failed to delete supplier." });
  }
};
