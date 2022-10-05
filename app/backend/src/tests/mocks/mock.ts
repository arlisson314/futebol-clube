import User from '../../database/models/userModel';

export const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  // senha: secret_admin
} as User;

export const loginBodyMock = { email: 'admin@admin.com', password: 'secret_admin' };
