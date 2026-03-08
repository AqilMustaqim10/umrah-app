import jwt from "jsonwebtoken";

// Generate a JWT token for a given user ID
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // Payload — what we store in the token
    process.env.JWT_SECRET, // Secret key — used to sign the token
    { expiresIn: process.env.JWT_EXPIRE || "30d" }, // Expiry
  );
};

export default generateToken;
