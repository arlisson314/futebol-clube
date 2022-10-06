import { Router } from 'express';
import LoginController from '../controllers/loginController';
import TeamController from '../controllers/teamController';

const routes = Router();

const loginController = new LoginController();
const teamController = new TeamController();

routes.post('/login', loginController.login);
routes.get('/login/validate', loginController.admin);

routes.get('/teams', teamController.teams);
routes.get('/teams/:id', teamController.team);

export default routes;
