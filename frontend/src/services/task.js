import axios from "axios";
import { handleRequestError } from "../helpers/handleRequestError";
import { authHeader } from "../helpers/authHeader";

const baseApi = "http://localhost:8000";

export default {
  async create(projectId, { description }) {
    try {
      const response = await axios.post(
        `${baseApi}/projects/${projectId}/tasks`,
        { description },
        { headers: authHeader() }
      );
      return response.data;
    } catch (err) {
      return handleRequestError(err);
    }
  },

  async update(projectId, taskId, data) {
    try {
      const response = await axios.put(
        `${baseApi}/projects/${projectId}/tasks/${taskId}`,
        data,
        { headers: authHeader() }
      );
      return response.data;
    } catch (err) {
      return handleRequestError(err);
    }
  },

  async delete(projectId, taskId) {
    try {
      const response = await axios.delete(
        `${baseApi}/projects/${projectId}/tasks/${taskId}`,
        { headers: authHeader() }
      );
      return response.data;
    } catch (err) {
      return handleRequestError(err);
    }
  },
};
