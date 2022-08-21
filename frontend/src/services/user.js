import axios from "axios";
import { handleRequestError } from "../helpers/handleRequestError";

const baseApi = "http://localhost:8000";

const USER_STORAGE_KEY = "user";

export default {
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
      return handleRequestError(err);
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
      return handleRequestError(err);
    }
  },
};

function generateAuthBasic({ username, password }) {
  return window.btoa(`${username}:${password}`);
}

function storeUser(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}
