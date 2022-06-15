import { nanoid } from "@reduxjs/toolkit";

import roles from "config/roles";

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

export const getUsers = () => users;

export const createUser = (email, password) => {
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
