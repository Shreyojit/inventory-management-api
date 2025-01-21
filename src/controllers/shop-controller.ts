import { db } from "@/db/db";
import { Request, Response } from "express";


export const createShop = async (req: Request, res: Response) => {

    try{
      const { name,location,adminId,attendent } = req.body;
      const shop = await db.shop.create({
        data: {
            name,
            location,
            adminId,
            attendent,
          },
      });

      res.status(201).json({ success: true, shop });

    }catch(error){
        res.status(500).json({ success: false, message: "Error creating shop", error });
    }

}

export const getAllShops = async(req:Request,res:Response) => {
    try{
       
        const shops = await db.shop.findMany({
            include: {
              admin: true, // Include admin details
            },
          });
    
          res.status(200).json({ success: true, shops });
    }catch(error){
        res.status(500).json({ success: false, message: "Error creating shop", error });
    }

    }

     // Get a single shop by ID
  export const getShopById = async(req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const shop = await db.shop.findUnique({
        where: { id },
        include: { admin: true }, // Include admin details
      });

      if (!shop) {
        return res.status(404).json({ success: false, message: "Shop not found" });
      }

      res.status(200).json({ success: true, shop });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching shop", error });
    }
  }

  // Update a shop
  export const updateShop = async(req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, location, attendent } = req.body;

      const shop = await db.shop.update({
        where: { id },
        data: { name, location, attendent },
      });

      res.status(200).json({ success: true, shop });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating shop", error });
    }
  }

  // Delete a shop
  export const deleteShop = async(req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await db.shop.delete({
        where: { id },
      });

      res.status(200).json({ success: true, message: "Shop deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error deleting shop", error });
    }
  }

  // Get all attendants for a shop
  export const getAttendants = async(req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const shop = await db.shop.findUnique({
        where: { id },
        select: { attendent: true },
      });

      if (!shop) {
        return res.status(404).json({ success: false, message: "Shop not found" });
      }

      res.status(200).json({ success: true, attendents: shop.attendent });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching attendants", error });
    }
  }