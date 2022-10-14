import { RequestHandler } from 'express';
import ILoginBody from '../interfaces/IloginBody';
import LoginServices from '../services/loginService';

export default class LoginController {
  private _loginService = new LoginServices();

  public login: RequestHandler = async (req, res) => {
    const { email, password } = req.body as ILoginBody;
    const { code, data } = await this._loginService.login(email, password);
    return res.status(code).json(data);
  };

  public role: RequestHandler = async (req, res) => {
    const { authorization: token } = req.headers;
    const { code, data } = await this._loginService.role(token as string);
    return res.status(code).json(data);
  };
}
