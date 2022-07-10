let cached = null;

const getAccessToken = () => {
   return cached || (cached = localStorage.getItem("access"));
};

const setAccessToken = (token) => {
   cached = token;
   localStorage.setItem("access", token);
};

const removeAccessToken = () => {
   cached = localStorage.removeItem("access");
};

const tokenService = {
   getAccessToken,
   setAccessToken,
   removeAccessToken,
};

export default tokenService;
