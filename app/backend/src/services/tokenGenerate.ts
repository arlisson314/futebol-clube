import * as JWT from 'jsonwebtoken';

const tokenGenerate = (payload: JWT.JwtPayload): string => {
  const token = JWT.sign(payload, process.env.JWT_SECRET as string);
  return token;
};
export default tokenGenerate;
