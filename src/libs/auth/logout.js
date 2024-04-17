export const logout = (navigate, setAuth) => {
  setAuth({});
  localStorage.removeItem("twc-auth");
  navigate("/login");
};
