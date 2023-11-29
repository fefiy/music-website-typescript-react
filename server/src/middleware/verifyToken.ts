import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization ;
  
  if (authHeader) {
    console.log("autho fro verify", authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded: any) => {
      if (err) {
        console.log("err from verify", err)
        return res.sendStatus(403);
      }
      req.user = decoded; 
      console.log("next calded")// Attach user information to the request for later use
      next(); // User is signed in
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

// Middleware to check if the user is an admin
export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const user = req.user;
  if (user && user.role === "admin") {
    next(); // User is an admin
  } else {
    res.sendStatus(403); // User is not an admin
  }
};


