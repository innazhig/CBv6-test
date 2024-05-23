import request from 'supertest';
import 'dotenv/config';

export function login(email, password) {
  return request(process.env.BASE_URL)
    .post('user/login')
    .send({ email, password: password });
}
