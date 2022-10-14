import { Router } from 'express';
import MatchComtroller from '../controllers/matchController';
import LoginController from '../controllers/loginController';
import TeamController from '../controllers/teamController';
import LeadBordController from '../controllers/leadBoardController';

const routes = Router();

const loginController = new LoginController();
const teamController = new TeamController();
const matchController = new MatchComtroller();
const leadBordController = new LeadBordController();

routes.post('/login', loginController.login);
routes.get('/login/validate', loginController.role);

routes.get('/teams', teamController.teams);
routes.get('/teams/:id', teamController.team);

routes.get('/matches', matchController.matches);
routes.post('/matches', matchController.matches);
routes.patch('/matches/:id/finish', matchController.editMatches);
routes.patch('/matches/:id', matchController.updateMatches);
routes.get('/leaderboard/home', leadBordController.leadBoardHome);
routes.patch('/matches/:id', matchController.updateMatches);

export default routes;
