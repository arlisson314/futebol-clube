import { StatusCodes } from 'http-status-codes';
import * as joi from 'joi';
import ILoginService from '../interfaces/ILoginService';
import User from '../database/models/userModel';
import tokenGenerate from './tokenGenerate';
import decodeHash from './decode';
import ErrorCustom from '../Middlewares/errorCustum';

export default class LoginServices {
  private _userModel = User;

  login = async (email: string, password: string): Promise<ILoginService> => {
    LoginServices.validateLoginBody({ email, password });

    const user = await this._userModel.findOne({ where: { email } });
    if (!user) {
      throw new ErrorCustom(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email or password',
      );
    }

    await decodeHash(password, user.password);

    const { id, username } = user;
    const token = tokenGenerate({ id, username, email });
    return { code: StatusCodes.OK, data: { token } };
  };

  static validateLoginBody = (body: unknown) => {
    const schema = joi.object({
      email: joi
        .string()
        .email()
        .required()
        .error(new ErrorCustom(StatusCodes.BAD_REQUEST, 'All fields must be filled')),
      password: joi
        .string()
        .min(6)
        .required()
        .error(new ErrorCustom(StatusCodes.BAD_REQUEST, 'All fields must be filled')),
    });

    const { error } = schema.validate(body);

    if (error) {
      throw error;
    }
  };
}
