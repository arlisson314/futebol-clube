import StatusCodes from 'http-status-codes';
import ILoginService from '../interfaces/ILoginService';
import Teams from '../database/models/teamModel';

export default class TeamServices {
  private _teamModel = Teams;

  public teams = async (): Promise<ILoginService> => {
    const team = await this._teamModel.findAll() as Teams[];
    return { code: StatusCodes.OK, data: team };
  };

  public team = async (id: string): Promise<ILoginService> => {
    const team = await this._teamModel.findByPk(id) as Teams;
    return { code: StatusCodes.OK, data: team };
  };
}
