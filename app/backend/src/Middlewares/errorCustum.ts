import { StatusCodes } from 'http-status-codes';

class ErrorCustom extends Error {
  constructor(
    public code: StatusCodes,
    public message: string,
  ) {
    super(message);
  }
}

export default ErrorCustom;
