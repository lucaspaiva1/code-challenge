import axios from "axios";
import { handleRequestError } from "../helpers/handleRequestError";
import { authHeader } from "../helpers/authHeader";

const baseApi = "http://localhost:8000";

export default {
  async list() {
    try {
      const response = await axios.get(`${baseApi}/projects`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (err) {
      return handleRequestError(err);
    }
  },

  async create({ name }) {
    try {
      const response = await axios.post(
        `${baseApi}/projects`,
        { name },
        { headers: authHeader() }
      );
      return response.data;
    } catch (err) {
      return handleRequestError(err);
    }
  },

  async update(id, { name }) {
    try {
      const response = await axios.put(
        `${baseApi}/projects/${id}`,
        { name },
        { headers: authHeader() }
      );
      return response.data;
    } catch (err) {
      return handleRequestError(err);
    }
  },

  async delete(id) {
    try {
      const response = await axios.delete(`${baseApi}/projects/${id}`, {
        headers: authHeader(),
      });
      return response.data;
    } catch (err) {
      return handleRequestError(err);
    }
  },
};
