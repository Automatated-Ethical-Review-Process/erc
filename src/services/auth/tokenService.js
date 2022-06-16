import userService from "./userService";

const getRefreshToken = () => {
   const user = userService.getUser();
   if (user) {
      return user.refresh;
   }
};

const getAccessToken = () => {
   const user = userService.getUser();
   if (user) {
      return user.access;
   }
};

const updateAccessToken = (token) => {
   const user = userService.getUser();
   if (user) {
      user.access = token;
      userService.setUser(user);
   }
};

const tokenService = {
   getRefreshToken,
   getAccessToken,
   updateAccessToken,
};

export default tokenService;
