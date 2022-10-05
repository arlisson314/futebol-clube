import { Request, Response } from 'express';
import ILoginBody from '../interfaces/IloginBody';
import LoginServices from '../services/loginService';

export default class LoginController {
  private _loginService = new LoginServices();

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as ILoginBody;
    const { code, data } = await this._loginService.login(email, password);
    return res.status(code).json(data);
  };
}
