import StatusCodes from 'http-status-codes';
import ILoginService from '../interfaces/ILoginService';
import Teams from '../database/models/teamModel';

export default class TeamServices {
  private _teamModel = Teams;

  public teams = async (): Promise<ILoginService> => {
    const team = await this._teamModel.findAll();
    return { code: StatusCodes.OK, data: team };
  };
}
