import { db } from "@/db/db";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Create User
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password, firstname, lastname, phone, dob, gender, image, role } = req.body;

    // Validate required fields
    if (!email || !username || !password || !firstname || !lastname || !phone || !role) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Check if email, phone, or username already exists
    const existingUserByEmail = await db.user.findUnique({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "A user with this email already exists." });
    }

    const existingUserByPhone = await db.user.findUnique({ where: { phone } });
    if (existingUserByPhone) {
      return res.status(400).json({ message: "A user with this phone number already exists." });
    }

    const existingUserByUsername = await db.user.findUnique({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "A user with this username already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the user
    const user = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        firstname,
        lastname,
        phone,
        dob: dob ? new Date(dob) : undefined, // Handle optional dob
        gender: gender?.toUpperCase(),       // Ensure gender is in uppercase
        image:image ? image : "data:image/jpeg;base64,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",
        role,
      },
    });

    // Remove sensitive data before sending response
    const { password: _password, ...others } = user;

    return res.status(201).json(others);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Failed to create user." });
  }
};

// Get All Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        firstname: true,
        lastname: true,
        phone: true,
        dob: true,
        gender: true,
        image: true,
        role: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Failed to fetch users." });
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        firstname: true,
        lastname: true,
        phone: true,
        dob: true,
        gender: true,
        image: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ message: "Failed to fetch user." });
  }
};

// Update User by ID
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, username, firstname, lastname, phone, dob, gender, image, role } = req.body;

    // Find the user to update
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user with the provided fields
    const updatedUser = await db.user.update({
      where: { id },
      data: {
        email,
        username,
        firstname,
        lastname,
        phone,
        dob: dob ? new Date(dob) : undefined,
        gender: gender?.toUpperCase(),
        image: image || user.image,  // Keep the current image if not updated
        role: role || user.role,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Failed to update user." });
  }
};

// Update User Password by ID
export const updateUserPasswordById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    // Find the user to update the password
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // Update the user's password
    const updatedUser = await db.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    });

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ message: "Failed to update password." });
  }
};

// Delete User by ID
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the user to delete
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete the user
    await db.user.delete({ where: { id } });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Failed to delete user." });
  }
};
