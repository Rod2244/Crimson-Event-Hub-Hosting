// src/utils/fetchWithAuth.js
export const fetchWithAuth = async (url, options = {}) => {
  // Get the token from localStorage (or wherever you store it)
  const token = localStorage.getItem("token");

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
