import * as JWT from 'jsonwebtoken';
import ITokenPayload from '../interfaces/ItokenInfo';

const tokenGenerate = (payload: ITokenPayload): string => {
  const token = JWT.sign(payload, process.env.JWT_SECRET as string);
  return token;
};
export default tokenGenerate;
