// src/api/authFetch.js

import { getAccessToken, setAccessToken, refreshAccessToken, clearTokens } from "./tokenService";

/**
 * Custom fetch wrapper that handles JWT authentication,
 * including automatic token refreshing on 401 responses.
 *
 * @param {string} url - The API endpoint.
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @returns {Promise<object>} - The JSON response from the API.
 */
export const authFetch = async (url, options = {}) => {
  let accessToken = getAccessToken();

  // Clone headers to avoid mutating the original options
  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const updatedOptions = {
    ...options,
    headers,
  };

  // Initial request
  let response = await fetch(url, updatedOptions);

  // If unauthorized, attempt to refresh the token
  if (response.status === 401) {
    console.warn("Access token expired or invalid. Attempting to refresh...");

    try {
      accessToken = await refreshAccessToken();

      // Update the Authorization header with the new token
      headers.set("Authorization", `Bearer ${accessToken}`);
      updatedOptions.headers = headers;

      // Retry the original request with the new token
      response = await fetch(url, updatedOptions);
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearTokens();
      // Optionally, redirect to login page
      window.location.href = "/login";
      throw error;
    }
  }

  // If still not OK, throw an error
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.detail || errorData.message || `HTTP error! Status: ${response.status}`
    );
  }

  // Return the JSON response
  return response.json();
};