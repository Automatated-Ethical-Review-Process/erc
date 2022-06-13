import { rest } from "msw";
import { nanoid } from "@reduxjs/toolkit";

import roles from "config/roles";

export const handlers = [
   rest.post("/api/auth/signup", (req, res, ctx) => {
      const { email, password } = req.body;

      let user = users.find((u) => u.email === email);

      if (!user) {
         user = createUser(email, password);
         return res(
            ctx.delay(400),
            ctx.json({
               id: user.id,
            })
         );
      }

      return res(
         ctx.delay(400),
         ctx.json({
            message: "user already registered",
         }),
         ctx.status(403)
      );
   }),

   rest.post("/api/auth/login", (req, res, ctx) => {
      const { email, password } = req.body;

      const user = users.find(
         (u) => u.email === email && u.password === password
      );

      if (user) {
         return res(
            ctx.delay(400),
            ctx.json({
               access: user.access,
               refresh: user.refresh,
               roles: user.roles,
            })
         );
      }

      return res(
         ctx.delay(400),
         ctx.json({
            message: "invalid credentials",
         }),
         ctx.status(403)
      );
   }),

   rest.post("/api/auth/logout", (req, res, ctx) => {
      const access = getAccess(req);

      const user = users.find((u) => u.access === access);

      if (user) {
         return res(
            ctx.delay(400),
            ctx.json({
               id: user.id,
            })
         );
      }

      return res(
         ctx.delay(400),
         ctx.json({
            message: "invalid credentials",
         }),
         ctx.status(403)
      );
   }),

   rest.get("/api/auth/getUser", (req, res, ctx) => {
      const access = getAccess(req);

      const user = users.find((u) => u.access === access);

      if (user) {
         return res(
            ctx.delay(400),
            ctx.json({
               id: user.id,
               email: user.email,
               roles: user.roles,
            })
         );
      }

      return res(
         ctx.delay(400),
         ctx.json({
            message: "unknown user",
         }),
         ctx.status(401)
      );
   }),
];

const getAccess = (req) => req.headers.get("authorization").split(" ").pop();

const users = [
   {
      id: nanoid(),
      email: "test@gmail.com",
      password: "password",
      access: "test-access-token",
      refresh: "test-refresh-token",
      roles: [
         roles.admin,
         roles.applicant,
         roles.clerk,
         roles.reviewer,
         roles.secretary,
      ],
   },
   {
      id: nanoid(),
      email: "admin@gmail.com",
      password: "password",
      access: "admin-access-token",
      refresh: "admin-refresh-token",
      roles: [roles.admin],
   },
   {
      id: nanoid(),
      email: "secretary@gmail.com",
      password: "password",
      access: "secretary-access-token",
      refresh: "secretary-refresh-token",
      roles: [roles.secretary, roles.reviewer],
   },
   {
      id: nanoid(),
      email: "reviewer@gmail.com",
      password: "password",
      access: "reviewer-access-token",
      refresh: "reviewer-refresh-token",
      roles: [roles.reviewer, roles.applicant],
   },
   {
      id: nanoid(),
      email: "clerk@gmail.com",
      password: "password",
      access: "clerk-access-token",
      refresh: "clerk-refresh-token",
      roles: [roles.clerk],
   },
   {
      id: nanoid(),
      email: "applicant@gmail.com",
      password: "password",
      access: "applicant-access-token",
      refresh: "applicant-refresh-token",
      roles: [roles.applicant],
   },
];

const createUser = (email, password) => {
   const user = {
      id: nanoid(),
      email,
      password,
      access: "user-access-token",
      refresh: "user-refresh-token",
      roles: [roles.applicant],
   };
   users.push(user);
   return user;
};
