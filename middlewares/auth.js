import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json("Forbidden");
    }
    req.user = payload;
    next();
  });
};
