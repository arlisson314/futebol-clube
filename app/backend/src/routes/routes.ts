import { Router } from 'express';
import MatchComtroller from '../controllers/matchController';
import LoginController from '../controllers/loginController';
import TeamController from '../controllers/teamController';

const routes = Router();

const loginController = new LoginController();
const teamController = new TeamController();
const matchController = new MatchComtroller();

routes.post('/login', loginController.login);
routes.get('/login/validate', loginController.admin);

routes.get('/teams', teamController.teams);
routes.get('/teams/:id', teamController.team);

// routes.get('/matches', matchController.matches);
routes.get('/matches', matchController.matches);

export default routes;
