import jwt from "jsonwebtoken";

export const generateToken = (userInfo) => {
  return new Promise((resolve, reject) => {
    const user = {
      _id: userInfo._id,
      email: userInfo.email,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET_KEY;
    const options = {
      expiresIn: "7d",
    };
    jwt.sign(user, secret, options, (err, token) => {
      if (err) {
        throw err
      }
      resolve(token);
    });
  });
};
