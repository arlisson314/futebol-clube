import * as JWT from 'jsonwebtoken';
import ITokenPayload from '../interfaces/ItokenInfo';

const tokenGenerate = (payload: ITokenPayload): string => {
  const token = JWT.sign(payload, 'Comed14nte');
  return token;
};
export default tokenGenerate;
