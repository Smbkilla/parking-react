const root = "";

// ENTRANCES
export const getAllEntrancesApi = () => `${root}/entrances`;
export const createEntranceApi = () => `${root}/entrance`;
export const updateEntranceApi = () => `${root}/entrance`;
export const deleteEntranceApi = (id) => `${root}/entrance/${id}`;

// FLOORS
export const getAllFloorsApi = () => `${root}/floors`;
export const getFloorApi = (id) => `${root}/floor/${id}`;
export const createFloorApi = () => `${root}/floor`;
export const updateFloorApi = () => `${root}/floor`;
export const deleteFloorApi = (id) => `${root}/floor/${id}`;

// PARKING SPACES
export const getAllParkingSpacesApi = () => `${root}/parkingSpaces`;
export const getClosestParkingSpaceApi = (entranceId) => `${root}/parkingSpace/entrance/${entranceId}`;
export const updateParkingSpaceOccupiedApi = (id) => `${root}/parkingSpace/occupied/${id}`;
export const numberOfUnoccupiedSpacesApi = () => `${root}/parkingSpace/unoccupied`;
export const createParkingSpaceApi = () => `${root}/parkingSpace`;
export const updateParkingSpaceApi = () => `${root}/parkingSpace`;
export const deleteParkingSpaceApi = (id) => `${root}/parkingSpace/${id}`;