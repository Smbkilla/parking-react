import axios from "axios";

import * as api from "../constants/api";

export const getAllFloors = () => {
  return axios.get(api.getAllFloorsApi());
};

export const getAllFloor = (id) => {
  return axios.get(api.getFloorApi(id));
};

export const createFloor = (floor) => {
  return axios.post(api.createFloorApi(), floor);
};

export const updateFloor = (floor) => {
  return axios.put(api.updateFloorApi(), floor);
};

export const deleteFloor = (id) => {
  return axios.delete(api.deleteFloorApi(id));
};