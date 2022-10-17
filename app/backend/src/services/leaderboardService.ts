import StatusCodes from 'http-status-codes';
import ILeadBoard from '../interfaces/IleadBord';
import IService from '../interfaces/IServiceResponse';
import Match from '../database/models/matchModel';
import queryTeams from '../interfaces/query';

export default class LeaderBoardService {
  private _matchModel = Match;

  public leadBoardHome = async (): Promise<IService> => {
    const [matchsHome] = (await this._matchModel
      .sequelize?.query(queryTeams.home)) as [ILeadBoard[], unknown];

    const table = LeaderBoardService.table(matchsHome);
    return { code: StatusCodes.OK, data: table };
  };

  public leadBoardAway = async (): Promise<IService> => {
    const [matchsAway] = (await this._matchModel
      .sequelize?.query(queryTeams.away)) as [ILeadBoard[], unknown];

    const table = LeaderBoardService.table(matchsAway);
    return { code: StatusCodes.OK, data: table };
  };

  public leadBoar = async (): Promise<IService> => {
    const { data: matchsHome } = await this.leadBoardHome();
    const { data: matchsAway } = await this.leadBoardAway();

    const tableAll = LeaderBoardService
      .tableAll(matchsHome as ILeadBoard[], matchsAway as ILeadBoard[]);

    const sortedTableAll = LeaderBoardService.sortedTeams(tableAll);
    return { code: StatusCodes.OK, data: sortedTableAll };
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

  static tableAll = (matchsHome: ILeadBoard[], matchsAway: ILeadBoard[]) => matchsHome
    .map((mH) => {
      const awayTeamData = matchsAway.find((mA) => (mH.name === mA.name));
      const generalTable = {
        name: mH.name,
        totalPoints: mH.totalPoints + Number(awayTeamData?.totalPoints),
        totalGames: mH.totalGames + Number(awayTeamData?.totalGames),
        totalVictories: mH.totalVictories + Number(awayTeamData?.totalVictories),
        totalDraws: mH.totalDraws + Number(awayTeamData?.totalDraws),
        totalLosses: mH.totalLosses + Number(awayTeamData?.totalLosses),
        goalsFavor: mH.goalsFavor + Number(awayTeamData?.goalsFavor),
        goalsOwn: mH.goalsOwn + Number(awayTeamData?.goalsOwn),
        goalsBalance: mH.goalsBalance + Number(awayTeamData?.goalsBalance),
        efficiency: (((mH.totalPoints + Number(awayTeamData?.totalPoints))
          / ((mH.totalGames + Number(awayTeamData?.totalGames)) * 3)) * 100).toFixed(2).toString(),
      };
      return generalTable;
    });

  static sortedTeams = (tableAll: ILeadBoard[]) => tableAll.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    return 0;
  });
}
