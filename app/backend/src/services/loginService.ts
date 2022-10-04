import { StatusCodes } from 'http-status-codes';
import ILoginService from '../interfaces/ILoginService';
import User from '../database/models/userModel';
import tokenGenerate from './tokenGenerate';
import decodeHash from './decode';
import ErrorCustom from '../Middlewares/errorCustum';

export default class LoginServices {
  private _userModel = User;

  login = async (email: string, password: string): Promise<ILoginService> => {
    const user = await this._userModel.findOne({ where: { email } });
    if (!user) {
      throw new ErrorCustom(
        StatusCodes.BAD_REQUEST,
        'User not found.',
      );
    }

    await decodeHash(password, user.password);
    const { id, username } = user;
    const token = tokenGenerate({ id, username, email });
    return { code: StatusCodes.OK, data: { token } };
  };
}
