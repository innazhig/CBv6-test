import request from 'supertest';
import { expect } from 'chai';
//import 'dotenv/config'; //imported in a global hook project-setup.js
import { login } from '../helpers/generalHelper.js';

describe('AUTHENTICATION', () => {
  let res;
  describe.only('POSITIVE TESTS', () => {
    before(async () => {
      // res = await request(process.env.BASE_URL)
      // .post('user/login'))
      // .send({email:process.env.EMAIL, password:process.env.PASSWORD});
      res = await login(process.env.EMAIL, process.env.PASSWORD);
      console.log(process.env.TOKEN);
    });

    it('verify response body message', async () => {
      expect(res.body.message).to.equal('Auth success');
    });

    it('verify response status code', async () => {
      expect(res.status).to.eq(200);
    });
  });

  describe('NEGATIVE TESTS', () => {
    describe('INVALID PASSWORD', () => {
      before(async () => {
        //   res = await request(process.env.BASE_URL)
        //     .post('user/login')
        //     .send({ email: process.env.INVALID, password: process.env.PASSWORD });
        res = await login(process.env.EMAIL, '0000');
      });

      it('verify response status code', async () => {
        expect(res.status).to.eq(400);
      });

      it('verify response body message', async () => {
        expect(res.body.message).to.equal('Auth failed');
      });
    });

    describe('INVALID EMAIL', () => {
      before(async () => {
        res = await login('invalid@test.com', process.env.PASSWORD);
      });

      it('verify response body message', async () => {
        expect(res.body.message).to.equal('Auth failed');
      });

      it('verify response status code', async () => {
        expect(res.status).to.eq(400);
      });
    });
  });
});
