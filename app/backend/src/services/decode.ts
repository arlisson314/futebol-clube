import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import ErrorCustom from '../Middlewares/errorCustum';

const decodeHash = async (password: string, hashPassword :string) => {
  const verify = await bcrypt.compare(password, hashPassword);
  if (!verify) {
    throw new ErrorCustom(
      StatusCodes.UNAUTHORIZED,
      'Incorrect email or password',
    );
  }
};

export default decodeHash;
