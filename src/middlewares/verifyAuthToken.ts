import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = (authorizationHeader as string).split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    return res.status(401).json(`Invalid token ${error}`);
  }
};
