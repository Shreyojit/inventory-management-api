import { createShop, deleteShop, getAllShops, getAttendants, getShopById, updateShop } from "@/controllers/shop-controller";
import express from "express";


const shopRouter = express.Router();

// Create a new shop
shopRouter.post("/", createShop);

// Get all shops
shopRouter.get("/", getAllShops);

// Get a shop by ID
shopRouter.get("/:id", getShopById);

// Update a shop
shopRouter.put("/:id", updateShop);

// Delete a shop
shopRouter.delete("/:id", deleteShop);

// Get attendants of a shop
shopRouter.get("/attendants/:id", getAttendants);

export default shopRouter;
