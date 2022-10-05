import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { StatusCodes } from 'http-status-codes';
import User from '../database/models/userModel';
import {loginBodyMock, userMock} from './mocks/mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {

  before(async () => {
    sinon.stub(User, 'findOne').resolves(userMock)
  })
  after(async () => {(User.findOne as sinon.SinonStub).restore()});
  
  let chaiHttpResponse: Response;

  it('Verifica se retorna um token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginBodyMock);

    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Verifica se retorna statuscode 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(loginBodyMock);

    expect(chaiHttpResponse.status).to.be.equal(StatusCodes.OK);
  })

});
