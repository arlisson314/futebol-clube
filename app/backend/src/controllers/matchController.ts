import { RequestHandler } from 'express';
import MatchServices from '../services/matchService';

export default class MatchComtroller {
  private _matchService = new MatchServices();

  matches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const { code, data } = await this._matchService.matchesByfilter(inProgress as string);
      return res.status(code).json(data);
    }
    const { code, data } = await this._matchService.matches();
    return res.status(code).json(data);
  };
}
