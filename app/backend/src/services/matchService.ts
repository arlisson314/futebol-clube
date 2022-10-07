import StatusCodes from 'http-status-codes';
import IService from '../interfaces/IServiceResponse';
import Match from '../database/models/matchModel';
import Team from '../database/models/teamModel';
import ErrorCustom from '../Middlewares/errorCustum';

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

  public matchesByfilter = async (inProgress: string): Promise<IService> => {
    const query = (inProgress === 'true' || inProgress === 'false') ? JSON.parse(inProgress) : null;

    if (query === null) {
      throw new ErrorCustom(StatusCodes.BAD_REQUEST, 'Invalid query');
    }

    const matches = await this._matchModel.findAll({
      where: { inProgress: query },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: StatusCodes.OK, data: matches };
  };
}
