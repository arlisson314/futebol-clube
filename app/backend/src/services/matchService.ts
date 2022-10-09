import StatusCodes from 'http-status-codes';
import * as joi from 'joi';
import * as JWT from 'jsonwebtoken';
import IAddMatches from '../interfaces/IAddMatches';
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

    if (query === null) { throw new ErrorCustom(StatusCodes.BAD_REQUEST, 'Invalid term'); }

    const matches = await this._matchModel.findAll({
      where: { inProgress: query },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { code: StatusCodes.OK, data: matches };
  };

  public addMatches = async (
    { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: IAddMatches,
    token: string,
  ): Promise<IService> => {
    const body = { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
    MatchServices.authToken(token);
    MatchServices.checkTeams(body.homeTeam, body.awayTeam);
    MatchServices.validateLoginBody(body);

    const add = await this._matchModel.create({ ...body });

    return { code: StatusCodes.CREATED, data: add };
  };

  public editMatches = async (id: string): Promise<IService> => {
    const edit = await this._matchModel.findByPk(id) as Match;
    if (!edit) {
      throw new ErrorCustom(StatusCodes.BAD_REQUEST, 'non-existent match');
    }
    await edit.update({ inProgress: 'false' });
    return { code: StatusCodes.OK, data: { message: 'Finished' } };
  };

  public updateMatches = async (
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: string,
  ): Promise<IService> => {
    const match = await this._matchModel.findByPk(id) as Match;

    if (!match) {
      throw new ErrorCustom(StatusCodes.BAD_REQUEST, 'non-existent match');
    }
    await match.update({ homeTeamGoals, awayTeamGoals });
    return { code: StatusCodes.OK, data: { message: 'OK' } };
  };

  public checkTeamExist = async (teamId: number): Promise<void> => {
    const team = await this._matchModel.findByPk(teamId);
    if (!team) {
      throw new ErrorCustom(StatusCodes.NOT_FOUND, 'There is no team with such id!');
    }
  };

  static validateLoginBody = (body: unknown):void => {
    const ERROR = new ErrorCustom(StatusCodes.BAD_REQUEST, 'All fields must be filled');
    const schema = joi.object({
      homeTeam: joi.number().required().error(ERROR),
      awayTeam: joi.number().required().error(ERROR),
      homeTeamGoals: joi.number().required().error(ERROR),
      awayTeamGoals: joi.number().required().error(ERROR),
      inProgress: joi.boolean().required().error(ERROR),
    });
    const { error } = schema.validate(body);
    if (error) {
      throw error;
    }
  };

  static checkTeams = (team1: number, team2: number): void => {
    if (team1 === team2) {
      throw new ErrorCustom(
        StatusCodes.UNAUTHORIZED,
        'It is not possible to create a match with two equal teams',
      );
    }
  };

  static authToken = (token: string): void => {
    try {
      if (!token) {
        throw new ErrorCustom(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
      }
      JWT.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      throw new ErrorCustom(StatusCodes.UNAUTHORIZED, 'Token must be a valid token');
    }
  };
}
