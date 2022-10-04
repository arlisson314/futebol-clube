import { NextFunction, Request, Response } from 'express';
import ErrorCustom from './errorCustum';

const errorHandles = (
  err: ErrorCustom,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => res.status(err.code).json(err.message);

export default errorHandles;
