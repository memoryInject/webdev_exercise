import '@testing-library/jest-dom/extend-expect';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const users = [
  {
    id: 2,
    username: 'Matthew',
    skills: ['Physiotherapist', 'Chief Strategy Officer'],
    first_name: 'Eric',
    last_name: 'Rodriguez',
    email: 'henrytimothy@example.com',
  },
  {
    id: 5,
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
];

const API_HOST = '/api/v1';
process.env.API_HOST = API_HOST;

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
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
