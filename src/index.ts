import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Define a route to get customers
app.get("/customers", async (req: Request, res: Response) => {
  try {
    // Sample customer data (could be from a database in a real app)
    const customers = [
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "987-654-3210"
      }
    ];

    return res.status(200).json(customers);
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({ message: "Something went wrong" });
  }
});
