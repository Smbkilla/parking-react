import axios from "axios";

import * as api from "../constants/api";

export const getAllParkingSpaces = () => {
  return axios.get(api.getAllParkingSpacesApi());
};

export const getClosestParkingSpace = (entranceId) => {
  return axios.get(api.getClosestParkingSpaceApi(entranceId));
};

export const updateParkingSpaceOccupied = (id, occupied) => {
  return axios.put(api.updateParkingSpaceOccupiedApi(id), {occupied});
};

export const numberOfUnoccupiedSpaces = () => {
  return axios.get(api.numberOfUnoccupiedSpacesApi());
};

export const createParkingSpace = (parkingSpace) => {
  return axios.post(api.createParkingSpaceApi(), parkingSpace);
};

export const updateParkingSpace = (parkingSpace) => {
  return axios.put(api.updateParkingSpaceApi(), parkingSpace);
};

export const deleteParkingSpace = (id) => {
  return axios.get(api.deleteParkingSpaceApi(id));
};