import { StatusCodes } from 'http-status-codes';
import * as joi from 'joi';
import * as JWT from 'jsonwebtoken';
import ILoginService from '../interfaces/ILoginService';
import User from '../database/models/userModel';
import tokenGenerate from './tokenGenerate';
import decodeHash from './decode';
import ErrorCustom from '../Middlewares/errorCustum';
import ITokenPayload from '../interfaces/ItokenInfo';

export default class LoginServices {
  private _userModel = User;

  public login = async (email: string, password: string): Promise<ILoginService> => {
    LoginServices.validateLoginBody({ email, password });

    const user = await this._userModel.findOne({ where: { email } });
    if (!user) {
      throw new ErrorCustom(
        StatusCodes.UNAUTHORIZED,
        'Incorrect email or password',
      );
    }

    await decodeHash(password, user.password);

    const token = tokenGenerate({ id: user.id, username: user.username, email });
    return { code: StatusCodes.OK, data: { token } };
  };

  public admin = async (token: string): Promise<ILoginService> => {
    const { email } = JWT.verify(token, process.env.JWT_SECRET as string) as ITokenPayload;
    const user = await this._userModel.findOne({ where: { email } });
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
