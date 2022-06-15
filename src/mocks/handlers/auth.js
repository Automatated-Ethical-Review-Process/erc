import { rest } from "msw";

import { path, getToken, resp } from "mocks/utils";
import { getUsers, createUser } from "mocks/db/auth/user";

const api = path("/api/auth/");

const handlers = [
   rest.post(api("signup"), (req, res, ctx) => {
      const { email, password } = req.body;

      let user = getUsers().find((u) => u.email === email);

      if (!user) {
         user = createUser(email, password);
         return resp(res, ctx, {
            id: user.id,
         });
      }

      return resp(
         res,
         ctx,
         {
            message: "user already registered",
         },
         403
      );
   }),

   rest.post(api("login"), (req, res, ctx) => {
      const { email, password } = req.body;

      const user = getUsers().find(
         (u) => u.email === email && u.password === password
      );

      if (user) {
         return resp(res, ctx, {
            access: user.access,
            refresh: user.refresh,
            roles: user.roles,
         });
      }

      return resp(
         res,
         ctx,
         {
            message: "invalid credentials",
         },
         403
      );
   }),

   rest.post(api("logout"), (req, res, ctx) => {
      const access = getToken(req);

      const user = getUsers().find((u) => u.access === access);

      if (user) {
         return resp(res, ctx, {
            id: user.id,
         });
      }

      return resp(
         res,
         ctx,
         {
            message: "invalid credentials",
         },
         403
      );
   }),

   rest.get(api("getUser"), (req, res, ctx) => {
      const access = getToken(req);

      const user = getUsers().find((u) => u.access === access);

      if (user) {
         return resp(res, ctx, {
            id: user.id,
            email: user.email,
            roles: user.roles,
         });
      }

      return resp(
         res,
         ctx,
         {
            message: "unknown user",
         },
         401
      );
   }),
];

export default handlers;
