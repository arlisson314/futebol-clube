import { StatusCodes } from 'http-status-codes';
import * as JWT from 'jsonwebtoken';
import ILoginService from '../interfaces/ILoginService';
import User from '../database/models/userModel';
import ITokenPayload from '../interfaces/ItokenInfo';
import ErrorCustom from '../Middlewares/errorCustum';

export default class LoginValidateServices {
  private _userModel = User;

  admin = async (token: string): Promise<ILoginService> => {
    const { email } = JWT.verify(token, process.env.JWT_SECRET as string) as ITokenPayload;
    const user = await this._userModel.findOne({ where: { email } });
    if (!user) {
      throw new ErrorCustom(
        StatusCodes.UNAUTHORIZED,
        'Unautorized User',
      );
    }
    return { code: StatusCodes.OK, data: { role: user.role } };
  };
}
