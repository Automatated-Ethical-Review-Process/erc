import { getUser, updateUser } from "./base";

const authService = {
   get hasEmail() {
      return !!this.email;
   },
   get email() {
      return getUser()?.email;
   },
   set email(email) {
      updateUser({ email });
   },
   get hasAccess() {
      return !!this.access;
   },
   get access() {
      return getUser()?.access;
   },
   set access(access) {
      updateUser({ access });
   },
   get hasRefresh() {
      return !!this.refresh;
   },
   get refresh() {
      return getUser()?.refresh;
   },
   set refresh(refresh) {
      updateUser({ refresh });
   },
   update: updateUser,
   reset: () => updateUser({ access: null, refresh: null }),
};

export default authService;
