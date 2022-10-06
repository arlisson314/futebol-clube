import StatusCodes from 'http-status-codes';
import IService from '../interfaces/IServiceResponse';
import Teams from '../database/models/teamModel';
import ErrorCustom from '../Middlewares/errorCustum';

export default class TeamServices {
  private _teamModel = Teams;

  public teams = async (): Promise<IService> => {
    const team = await this._teamModel.findAll() as Teams[];
    return { code: StatusCodes.OK, data: team };
  };

  public team = async (id: string): Promise<IService> => {
    const team = await this._teamModel.findByPk(id) as Teams;
    if (!team) { throw new ErrorCustom(StatusCodes.BAD_REQUEST, 'Invalid Id'); }
    return { code: StatusCodes.OK, data: team };
  };
}
