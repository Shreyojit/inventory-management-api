import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "6h",
};

export function generateAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("SECRET_KEY is not set in environment variables");
  }
  return jwt.sign(payload, secret, options);
}
