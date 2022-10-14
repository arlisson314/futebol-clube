import { StatusCodes } from 'http-status-codes';

import * as joi from 'joi';
import * as bcrypt from 'bcryptjs';
import * as JWT from 'jsonwebtoken';

import IService from '../interfaces/IServiceResponse';
import User from '../database/models/userModel';
import tokenGenerate from './tokenGenerate';
import ErrorCustom from '../Middlewares/errorCustum';

export default class LoginServices {
  private _userModel = User;

  public login = async (email: string, password: string): Promise<IService> => {
    LoginServices.validateLoginBody({ email, password });
    // const regex = /^.*@.*\.com$/;
    // if (!regex.test(email) || password.length < 6) {
    //   throw new ErrorCustom(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    // }

    const user = await this._userModel.findOne({ where: { email } }) as User;
    if (!user) {
      throw new ErrorCustom(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      throw new ErrorCustom(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
    }

    const token = tokenGenerate({ id: user.id, username: user.username, email });

    return { code: StatusCodes.OK, data: { token } };
  };

  public role = async (token: string): Promise<IService> => {
    const { email } = JWT.verify(token, process.env.JWT_SECRET as string) as JWT.JwtPayload;

    const user = await this._userModel.findOne({ where: { email } }) as User;
    if (!user) {
      throw new ErrorCustom(StatusCodes.UNAUTHORIZED, 'Unautorized User');
    }
    return { code: StatusCodes.OK, data: { role: user.role } };
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
