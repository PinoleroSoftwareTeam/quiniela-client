const tokenKey = 'token';
const userKey = 'user';

const getToken = () => localStorage.getItem(tokenKey);
const setToken = (token: string) => localStorage.setItem(tokenKey, token);
const getUser = () => {
  const user = localStorage.getItem(userKey);
  return user ? JSON.parse(user) : {};
};
const setUser = (user: any) => {
  const userParse = JSON.stringify(user);
  localStorage.setItem(userKey, userParse);
};
const clear = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
};

const isAuthenticated = () => {
  var token = getToken();
  var user = getUser();
  return token && user;
};

export default {
  getToken,
  setToken,
  getUser,
  setUser,
  clear,
  isAuthenticated,
};
