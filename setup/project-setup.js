import request from 'supertest';
import 'dotenv/config';

before(async () => {
  const res = await request(process.env.BASE_URL)
    .post('user/login')
    .send({ email: process.env.EMAIL, password: process.env.PASSWORD });

  process.env.TOKEN = res.body.payload.token;
  console.log('token=', process.env.TOKEN);
});
