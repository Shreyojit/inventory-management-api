import { createUser, deleteUserById, getUserById, getUsers, updateUserById, updateUserPasswordById } from "@/controllers/user-controller";
import express from "express";


const userRouter = express.Router();

// Create User
userRouter.post("/", createUser);

// Get All Users
userRouter.get("/", getUsers);

// Get User by ID
userRouter.get("/:id", getUserById);

// Update User by ID
userRouter.put("/:id", updateUserById);

// Update User Password by ID
userRouter.put("update-password/:id", updateUserPasswordById);

// Delete User by ID
userRouter.delete("/:id", deleteUserById);

export default userRouter;
