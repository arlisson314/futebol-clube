import { RequestHandler } from 'express';
import MatchServices from '../services/matchService';

export default class MatchComtroller {
  private _matchService = new MatchServices();

  public matches: RequestHandler = async (_req, res) => {
    const { code, data } = await this._matchService.matches();
    return res.status(code).json(data);
  };
}
