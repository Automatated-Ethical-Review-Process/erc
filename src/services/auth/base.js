let cached = null;

const getUser = () => {
   if (!cached) {
      cached = JSON.parse(localStorage.getItem("user"));
   }
   return cached;
};

const setUser = (user) => {
   const toStore = JSON.stringify(user);
   if (JSON.stringify(getUser()) !== toStore) {
      cached = user;
      localStorage.setItem("user", toStore);
   }
};

const updateUser = (data) => setUser({ ...getUser(), ...data });

const removeUser = () => {
   cached = null;
   localStorage.removeItem("user");
};

export {
   getUser,
   updateUser,
   removeUser,
};
