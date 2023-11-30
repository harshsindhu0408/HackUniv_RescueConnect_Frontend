// agencyReducer.js

import { AgencyTypes } from "../action_types";

const initialState = {
  specificAgency: null,
  allAgencies: [],
  loadingSpecificAgency: false,
  loadingAllAgencies: false,
};

const agencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case AgencyTypes.GET_SPECIFIC_AGENCY_REQUEST:
      return { ...state, loadingSpecificAgency: true };
    case AgencyTypes.GET_SPECIFIC_AGENCY_SUCCESS:
      return {
        ...state,
        loadingSpecificAgency: false,
        specificAgency: action.payload,
      };
    case AgencyTypes.GET_SPECIFIC_AGENCY_FAILURE:
      return { ...state, loadingSpecificAgency: false };

    case AgencyTypes.GET_ALL_AGENCIES_REQUEST:
      return { ...state, loadingAllAgencies: true };
    case AgencyTypes.GET_ALL_AGENCIES_SUCCESS:
      return {
        ...state,
        loadingAllAgencies: false,
        allAgencies: action.payload,
      };
    case AgencyTypes.GET_ALL_AGENCIES_FAILURE:
      return { ...state, loadingAllAgencies: false };

    default:
      return state;
  }
};

export default agencyReducer;
