import { RequestHandler } from 'express';
import IAddMatches from '../interfaces/IAddMatches';
import MatchServices from '../services/matchService';

export default class MatchComtroller {
  private _matchService = new MatchServices();

  matches: RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const { code, data } = await this._matchService.matchesByfilter(inProgress as string);
      return res.status(code).json(data);
    }

    const body = req.body as IAddMatches;
    if (Object.keys(body).length > 0) {
      await this._matchService.checkTeamExist(body.homeTeam);
      await this._matchService.checkTeamExist(body.awayTeam);
      const { code, data } = await this._matchService.addMatches(body);
      return res.status(code).json(data);
    }

    const { code, data } = await this._matchService.matches();
    return res.status(code).json(data);
  };

  editMatches: RequestHandler = async (req, res) => {
    const { code, data } = await this._matchService.editMatches(req.params.id);
    return res.status(code).json(data);
  };
}
