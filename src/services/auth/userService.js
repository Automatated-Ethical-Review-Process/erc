let cached = null;

const setUser = (user) => {
   cached = user;
   localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
   if (!cached) {
      cached = JSON.parse(localStorage.getItem("user"));
   }
   return cached;
};

const removeUser = () => {
   cached = null;
   localStorage.removeItem("user");
};

export default {
   setUser,
   getUser,
   removeUser,
};
