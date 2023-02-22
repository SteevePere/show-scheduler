export const serverConfig = {
  axios: {
    baseUrl: process.env.REACT_APP_API_URL,
    options: { withCredentials: true },
  }
};