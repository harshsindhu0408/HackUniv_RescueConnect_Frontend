const BASE_URL = "https://hackuniv-rescueconnect-backend.onrender.com/api/n1";

// AGENCY END POINTS
export const agencyEndPoints = {
  REGISTER_API: BASE_URL + "/agency/register",
  LOGIN_API: BASE_URL + "/agency/login",
  UPDATE_PASSWORD_API: BASE_URL + "/agency/updatepassword",
  GET_AGENCY_PROFILE: BASE_URL + "/agency/agencyProfile",
  UPDATE_AGENCY_INFO_API: BASE_URL + "/agency/update",
  GET_AGENCY_RESOURCE_AND_DISASTER_API:
    BASE_URL + "/agency/getAgencyResourcesAndDisasters",
  GET_ALL_AGENCY_LOCATIONS_API: BASE_URL + "/agency/agencyLocations",
  GET_SPECIFIC_AGENCY_PROFILE: BASE_URL + "/agency/findAgency",
  GET_ALL_AGENCIES: BASE_URL + "/agency/findAllAgencies",
};

// RESOURCE END POINTS
export const resourceEndPoints = {
  CREATE_RESOURCE_API: BASE_URL + "/resource/create",
  UPDATE_RESOURCE_API: BASE_URL + "/resource/updateResource",
  GET_RESOURCE_API: BASE_URL + "/resource/getResources",
  LIST_RESOURCES_API: BASE_URL + "/resource/listResources",
  STATUS_OF_RESOURCES_API: BASE_URL + "/resource/getResourceStatus",
  SHARE_RESOURCES_API: BASE_URL + "/resource/shareResource",
  DELETE_RESOURCES_API: BASE_URL + "/resource/deleteResource",
  GET_SHARED_AGENCIES: BASE_URL + "/resource/getAgency",
};

// DISASTER END POINTS
export const disasterEndPoints = {
  ADD_DISASTER_API: BASE_URL + "/disaster/addDisaster",
  UPDATE_DISASTER_API: BASE_URL + "/disaster/updateDisaster",
  GET_DISASTER_API: BASE_URL + "/disaster/getDisaster",
  DELETE_DISASTER_API: BASE_URL + "/disaster/deleteDisaster",
  FETCH_ALL_DISASTERS_API: BASE_URL + "/disaster/allDisasters",
  FETCH_AGENCIES_FROM_DISASTER: BASE_URL + "/disaster/getAgenciesForDisaster",
};

// ALERT END POINTS
export const alertEndPoints = {
  CREATE_ALERT_API: BASE_URL + "/alert/createalerts",
  GET_AGENCY_ALERTS_API: BASE_URL + "/alert/getalerts",
};
