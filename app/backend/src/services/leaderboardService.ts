import StatusCodes from 'http-status-codes';
import ILeadBoard from '../interfaces/IleadBord';
import IService from '../interfaces/IServiceResponse';
import Match from '../database/models/matchModel';
import queryTeams from '../interfaces/query';

export default class LeaderBoardService {
  private _matchModel = Match;

  public leadBoardHome = async (): Promise<IService> => {
    const [matchs] = (await this._matchModel
      .sequelize?.query(queryTeams.homes)) as [ILeadBoard[], unknown];

    const table = LeaderBoardService.table(matchs);

    return { code: StatusCodes.OK, data: table };
  };

  public leadBoardAway = async (): Promise<IService> => {
    const [matchs] = (await this._matchModel
      .sequelize?.query(queryTeams.aways)) as [ILeadBoard[], unknown];

    const table = LeaderBoardService.table(matchs);

    return { code: StatusCodes.OK, data: table };
  };

  static table = (matchs: ILeadBoard[]) => matchs.map((e) => ({
    name: e.name,
    totalPoints: Number(e.totalPoints),
    totalGames: e.totalGames,
    totalVictories: Number(e.totalVictories),
    totalDraws: Number(e.totalDraws),
    totalLosses: Number(e.totalLosses),
    goalsFavor: Number(e.goalsFavor),
    goalsOwn: Number(e.goalsOwn),
    goalsBalance: Number(e.goalsBalance),
    efficiency: ((Number(e.totalPoints) / (e.totalGames * 3)) * 100).toFixed(2),
  }));
}
