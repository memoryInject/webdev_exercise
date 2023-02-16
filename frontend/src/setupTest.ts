import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const users = [
  {
    id: 1,
    username: 'Matthew',
    skills: ['Physiotherapist', 'Chief Strategy Officer'],
    first_name: 'Eric',
    last_name: 'Rodriguez',
    email: 'henrytimothy@example.com',
  },
  {
    id: 2,
    username: 'Morgan',
    skills: [
      'Medical physicist',
      'Geneticist, molecular',
      'Chief Strategy Officer',
      'Illustrator',
      'Administrator, sports',
    ],
    first_name: 'Brittany',
    last_name: 'Fowler',
    email: 'vanessa41@example.org',
  },
  {
    id: 3,
    username: 'foo',
    skills: ['python', 'typescript'],
    first_name: 'foo',
    last_name: 'bar',
    email: 'foo@bar.com',
  },
];

const API_HOST = '/api/v1';
process.env.API_HOST = API_HOST;
process.env.API_HOST_LOCAL = API_HOST;
const LOCAL_HOST = 'http://localhost:3000/api';

interface SignupBody {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  skills: string[];
}

// Mock server for both client fetch and server side fetch
const server = setupServer(
  rest.get(`${API_HOST}/users/`, (_req, res, ctx) => {
    return res(ctx.json(users));
  }),

  rest.get(`${API_HOST}/users/:id`, (req, res, ctx) => {
    const user = users.filter(
      (user) => user.id === parseInt(req.params.id as string)
    )[0];
    return res(ctx.json(user));
  }),

  rest.post<SignupBody, User>(`${LOCAL_HOST}/users`, async (req, res, ctx) => {
    const newUser = await req.json();
    newUser.id = users.length + 1;
    newUser.skills = [];
    users.push(newUser);

    return res(ctx.json(newUser));
  }),

  rest.put<User, User>(`${LOCAL_HOST}/users/:id`, async (req, res, ctx) => {
    const user = await req.json();

    users[parseInt(req.params.id) - 1].skills = user.skills;

    return res(ctx.json(user));
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
