// src/api/tokenService.js

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
  };
  
  export const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token);
  };
  
  export const setRefreshToken = (token) => {
    localStorage.setItem("refreshToken", token);
  };
  
  export const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  export const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };