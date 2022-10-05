import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => res.status(err.code).json({ message: err.message });

export default errorHandler;
