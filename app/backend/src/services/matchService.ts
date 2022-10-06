import StatusCodes from 'http-status-codes';
import IService from '../interfaces/IServiceResponse';
import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';

export default class MatchServices {
  private _matchModel = Match;

  public matches = async (): Promise<IService> => {
    const matches = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    }) as Match[];
    return { code: StatusCodes.OK, data: matches };
  };
}
