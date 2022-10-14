import { StatusCodes } from 'http-status-codes';
// import ILeadBoard from '../interfaces/IleadBord';
import IService from '../interfaces/IServiceResponse';
import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';

export default class LeaderBoardService {
  private _matchModel = Match;

  public leadBoardHome = async (): Promise<IService> => {
    const matchs = await this._matchModel.findAll({
      where: { inProgress: false },
      include: [{ model: Team, as: 'teamHome', attributes: { exclude: ['id'] } }],
    }) as Match[];

    const table = matchs.map((key) => ({
      name: key.teamHome.teamName,
      // totalPoints: LeaderBoardService.sumPoints(matchs),
    }));
    // return { code: StatusCodes.OK, data: matchs };
    return { code: StatusCodes.OK, data: table };
  };

  // static sumPoints = (matchs: Match[]) => {
  //   let points = 0;
  //   matchs.forEach((cur) => {
  //     if (cur.homeTeamGoals > cur.awayTeamGoals) { points += 3; }
  //     if (cur.homeTeamGoals === cur.awayTeamGoals) { points += 1; }
  //   }, 0);
  //   return points;
  // };
}
