import { RequestHandler } from 'express';
import TeamServices from '../services/teamService';

export default class TeamController {
  private _teamController = new TeamServices();

  public teams: RequestHandler = async (_req, res) => {
    const { code, data } = await this._teamController.teams();
    return res.status(code).json(data);
  };
}
