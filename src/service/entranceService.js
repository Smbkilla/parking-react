import axios from "axios";

import * as api from "../constants/api";

export const getAllEntrances = () => {
  return axios.get(api.getAllEntrancesApi());
};

export const createEntrance = ({entranceName, level}) => {
  return axios.post(api.createEntranceApi(), {
    entranceName,
    floor:{
      level,
    },
  });
};

export const updateEntrance = (entrance) => {
  return axios.put(api.updateEntranceApi(), entrance);
};

export const deleteEntrance = (id) => {
  return axios.delete(api.deleteEntranceApi(id));
};