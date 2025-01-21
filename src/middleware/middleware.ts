import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend the Request interface to include `user`
interface MyUserRequest extends Request {
  user?: string | JwtPayload; // Allow `JwtPayload` as well
}

export function verifyToken(req: MyUserRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided!" });
  }

  const token = authHeader.replace("Bearer ", "");
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({ message: "SECRET_KEY is not set in environment variables" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token!" });
    }

    req.user = decoded; // Attach decoded payload to the request
    next();
  });
}
