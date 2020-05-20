import axios from "axios";

import * as api from "../constants/api";

export const getAllEntrances = () => {
  return axios.get(api.getAllEntrancesApi());
};

export const createEntrance = (entrance) => {
  return axios.post(api.createEntranceApi(), entrance);
};

export const updateEntrance = (entrance) => {
  return axios.put(api.updateEntranceApi(), entrance);
};

export const deleteEntrance = (id) => {
  return axios.delete(api.deleteEntranceApi(id));
};