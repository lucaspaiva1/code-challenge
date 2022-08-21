import axios from "axios";

const baseApi = "http://localhost:8000";

const USER_STORAGE_KEY = "user";

export const userService = {
  async login({ username, password }) {
    try {
      const response = await axios.post(
        `${baseApi}/users/authenticate`,
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;
      const authBasic = generateAuthBasic({ username, password });
      storeUser({ ...data, authBasic });

      return data;
    } catch (err) {
      return handleError(err);
    }
  },

  logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  getCurrentUser() {
    const storage = localStorage.getItem(USER_STORAGE_KEY);
    return storage ? JSON.parse(storage) : null;
  },

  async register({ fullName, username, password }) {
    try {
      const response = await axios.post(
        `${baseApi}/users`,
        { fullName, username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;
      const authBasic = generateAuthBasic({ username, password });
      storeUser({ ...data, authBasic });

      return data;
    } catch (err) {
      return handleError(err);
    }
  },
};

function handleError(err) {
  return Promise.reject(
    err?.response?.data?.message || "An error has occurred"
  );
}

function generateAuthBasic({ username, password }) {
  return window.btoa(`${username}:${password}`);
}

function storeUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}
