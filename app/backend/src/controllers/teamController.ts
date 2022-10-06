import { RequestHandler } from 'express';
import TeamServices from '../services/teamService';

export default class TeamController {
  private _teamService = new TeamServices();

  public teams: RequestHandler = async (_req, res) => {
    const { code, data } = await this._teamService.teams();
    return res.status(code).json(data);
  };

  public team: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { code, data } = await this._teamService.team(id);
    return res.status(code).json(data);
  };
}
