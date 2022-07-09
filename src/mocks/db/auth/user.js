import { nanoid } from "@reduxjs/toolkit";

import Roles from "config/roles";

const users = [
   {
      id: nanoid(),
      email: "test@gmail.com",
      password: "password",
      access: "test-access-token",
      refresh: "test-refresh-token",
      roles: [
         Roles.admin,
         Roles.applicant,
         Roles.clerk,
         Roles.i_reviewer,
         Roles.secretary,
      ],
   },
   {
      id: nanoid(),
      email: "admin@gmail.com",
      password: "password",
      access: "admin-access-token",
      refresh: "admin-refresh-token",
      roles: [Roles.admin],
   },
   {
      id: nanoid(),
      email: "secretary@gmail.com",
      password: "password",
      access: "secretary-access-token",
      refresh: "secretary-refresh-token",
      roles: [Roles.secretary, Roles.i_reviewer],
   },
   {
      id: nanoid(),
      email: "reviewer@gmail.com",
      password: "password",
      access: "reviewer-access-token",
      refresh: "reviewer-refresh-token",
      roles: [Roles.e_reviewer, Roles.applicant],
   },
   {
      id: nanoid(),
      email: "clerk@gmail.com",
      password: "password",
      access: "clerk-access-token",
      refresh: "clerk-refresh-token",
      roles: [Roles.clerk],
   },
   {
      id: nanoid(),
      email: "applicant@gmail.com",
      password: "password",
      access: "applicant-access-token",
      refresh: "applicant-refresh-token",
      roles: [Roles.applicant],
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
      roles: [Roles.applicant],
   };
   users.push(user);
   return user;
};
