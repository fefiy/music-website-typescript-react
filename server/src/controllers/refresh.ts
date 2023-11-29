import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const refresh = async (req: AuthenticatedRequest, res: Response) => {
  const authHeader = req.headers.authorization;
  console.log("refresh callded");
  const { userId } = req.params;
  if (authHeader) {
    const token = authHeader && authHeader.split(" ")[1];

    jwt.verify(token, "secret", async (err, decoded: any) => {
      if (err) {
        const user = await User.findById(userId);
        const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
          expiresIn: "24h",
        });
        return res.status(200).json({ token });
      }
      if (decoded) {
        if (decoded.user_id !== userId) {
          return res.status(401);
        }
      }
    });
  }
};
