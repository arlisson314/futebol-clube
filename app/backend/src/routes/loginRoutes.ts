import { Router } from 'express';
import LoginController from '../controllers/loginController';
// import LoginValidatController from '../controllers/loginValidateController';

const login = Router();

const loginController = new LoginController();
// const loginValidatController = new LoginValidatController();

login.post('/', loginController.login);
login.get('/validate', loginController.admin);

export default login;
