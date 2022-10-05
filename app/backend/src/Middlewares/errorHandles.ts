import { ErrorRequestHandler } from 'express';
import ErrorCustom from './errorCustum';

const errorHandler: ErrorRequestHandler = (
  err: ErrorCustom,
  _req,
  res,
  _next,
) => res.status(err.code).json(err.message);

export default errorHandler;
