import { verify } from "jsonwebtoken";

const verifyToken = (token) => {
  try {
    return verify(token, import.meta.env.VITE_JWT_SECRET);
  } catch (error) {
    return false;
  }
};

export { verifyToken };
