import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpecificAgencyProfile } from "../redux/Actions/agencyAction";
import MapComponent from "../components/MapComponent";
import { FiEdit2 } from "react-icons/fi";

const AgencyProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificAgencyProfile(id));
  }, [dispatch, id]);

  const agencyData = useSelector((state) => state.agencies.specificAgency);
  const loggedInAgencyId = useSelector((state) => state.auth.user?.agencyId);

  if (!agencyData) {
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }

  const { agency, disasters, resources } = agencyData;

  const coordinates = [
    agency.location.coordinates[1],
    agency.location.coordinates[0],
  ];

  const isEditable = loggedInAgencyId === id;

  return (
    <div className="w-full flex flex-col items-center justify-center h-full scroll-smooth bg-gray-100">
      <div className="w-full flex flex-col items-center gap-y-10 justify-center">
        <div className="text-4xl overflow-hidden mt-2 lg:text-4xl font-bold text-indigo-700 text-center">
          Welcome To {agency.name}'s Profile
        </div>

        <div className="w-11/12 lg:w-8/12 xl:w-8/12 flex flex-col md:flex-row sm:flex-col md:items-center justify-between rounded-md border border-gray-300 bg-white p-6 md:p-8 shadow-md">
          <div className="flex flex-col items-start justify-center gap-y-2">
            <div className="text-2xl font-bold text-indigo-500">Basic Details</div>
            <div className="text-gray-700 text-lg font-bold mt-2">
              Agency Name: {agency.name}
            </div>
            <div className="text-gray-700 text-lg font-bold mt-2">
              Email: {agency.email}
            </div>
            <div className="text-gray-700 text-lg font-bold mt-2">
              Mobile: {agency.phoneNumber}
            </div>
          </div>
          {isEditable && (
            <Link to={`/update-agency/${id}`}>
              <div className="flex sm:w-full md:w-[200px] flex-row gap-x-2 items-center mt-4 md:mt-0 justify-center text-white font-bold overflow-hidden md:text-[14px] sm:text-xs sm:px-2 py-2 transition-all duration-200 border md:px-4 md:py-2 rounded-full bg-indigo-500 hover:bg-indigo-600">
                <button className="text-white overflow-hidden">
                  Update Profile
                </button>
                <FiEdit2 className="text-white" />
              </div>
            </Link>
          )}
        </div>

        <div className="w-full md:w-10/12 lg:w-9/12 xl:w-8/12 flex md:flex-row sm:flex-col gap-x-6 sm:gap-y-6 overflow-hidden items-center justify-center">
          <div className="w-11/12 bg-white md:w-1/2 border md:h-72 border-gray-300 shadow-lg rounded-md p-6 md:p-10">
            <p className="font-bold text-lg text-indigo-600">
              Where We Are Located
            </p>
            <div className="text-gray-700 text-lg font-bold mt-2">
              <p>Street: {agency.contact.address.street}</p>
              <p>City: {agency.contact.address.city}</p>
              <p>State: {agency.contact.address.state}</p>
              <p>Country: {agency.contact.address.country}</p>
              <p>Postal Code: {agency.contact.address.postalCode}</p>
            </div>
            {isEditable && (
              <Link to={`/update-agency-location/${id}`}>
                <div className="flex flex-row gap-x-2 items-center justify-center text-white font-bold md:text-[14px] sm:text-xs sm:px-2 py-2 transition-all duration-200 mt-4 border md:px-4 md:py-2 rounded-full bg-indigo-500 hover:bg-indigo-600">
                  <button className="text-white overflow-hidden">
                    Update Location
                  </button>
                  <FiEdit2 className="text-white" />
                </div>
              </Link>
            )}
          </div>
          <div className="w-full md:w-1/2 sm:w-11/12">
            <MapComponent
              coordinates={coordinates}
              className="w-full h-72 md:h-auto md:w-full rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="w-11/12 lg:w-9/12 mt-6">
          <h2 className="text-4xl text-center font-bold overflow-hidden mb-8 text-indigo-600">
            List Of Disasters Where We Have Helped In
          </h2>
          {/* Disaster info div */}
          <div>
            {disasters.map((disaster) => (
              <div
                key={disaster._id}
                className="p-4 border border-gray-300 mb-8 rounded-md shadow-md bg-white"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-indigo-700">
                    {disaster.typeOfDisaster}
                  </h3>
                  <p className="text-gray-700 font-bold">Severity: {disaster.severity}</p>
                  <p className="text-gray-700 font-bold">
                    Description: {disaster.description}
                  </p>
                  <p className="text-gray-700 font-bold">
                    Location: {disaster.contact.address.city},{" "}
                    {disaster.contact.address.state},{" "}
                    {disaster.contact.address.country}
                  </p>
                  <p className="text-gray-700 font-bold">Status: {disaster.status}</p>
                </div>

                <div>
                  <MapComponent
                    coordinates={[
                      disaster.location.coordinates[1],
                      disaster.location.coordinates[0],
                    ]}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* resources info div */}
        <div className="w-11/12 lg:w-9/12 mt-6">
          <h2 className="text-4xl text-center font-bold overflow-hidden mb-8 text-indigo-600">
            List Of Resources We Acquire
          </h2>
          <div>
            {resources.map((resource) => (
              <div
                key={resource._id}
                className="p-4 border border-gray-300 rounded-md shadow-md bg-white"
              >
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700">
                    {resource.name}
                  </h3>

                  <p className="text-gray-700">Quantity: {resource.quantity}</p>
                  <p className="text-gray-700">
                    Availability: {resource.availability.toString()}
                  </p>

                  <p className="text-gray-700">Status: {resource.status}</p>
                </div>

                <div>
                  <MapComponent
                    coordinates={[
                      resource.location.coordinates[1],
                      resource.location.coordinates[0],
                    ]}
                    className="w-full h-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyProfile;
