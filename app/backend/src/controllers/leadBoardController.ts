import { RequestHandler } from 'express';
import LeaderBoardService from '../services/leaderboardService';

export default class leadBordController {
  private _leadBordService = new LeaderBoardService();

  public leadBoardHome: RequestHandler = async (_req, res) => {
    const { code, data } = await this._leadBordService.leadBoardHome();
    return res.status(code).json(data);
  };

  public leadBoardAway: RequestHandler = async (_req, res) => {
    const { code, data } = await this._leadBordService.leadBoardAway();
    return res.status(code).json(data);
  };

  public leadBoar: RequestHandler = async (_req, res) => {
    const { code, data } = await this._leadBordService.leadBoar();
    return res.status(code).json(data);
  };
}
