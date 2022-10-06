import { Request, Response } from 'express';
import LoginValidateServices from '../services/loginValidateService';

export default class LoginValidatController {
  private _loginValidateService = new LoginValidateServices();

  admin = async (req: Request, res: Response) => {
    const { authorization: token } = req.headers;
    const { code, data } = await this._loginValidateService.admin(token as string);
    return res.status(code).json(data);
  };
}
