import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiEdit2 } from "react-icons/fi";
import { MdPassword } from "react-icons/md";
import MapComponent from "../components/MapComponent";

const Profile = () => {
  const state = useSelector((state) => state.profile);
  const agency = useSelector((state) => state.profile.accountInfo);
  ;

  if (state.loading || !agency) {
    return (
      <div className="spinner w-full flex items-center justify-center"></div>
    );
  }
  console.log(agency);

  const coordinates = [
    agency.location.coordinates[1],
    agency.location.coordinates[0],
  ];

  return (
    <div className="w-full flex flex-col mb-20 items-center justify-center h-full scroll-smooth">
      <div className="w-full flex flex-col items-center gap-y-10 justify-center p-6">
        {/* Titile */}
        <div className="text-4xl overflow-hidden mt-2 lg:text-4xl font-bold text-indigo-700 text-center">
          Welcome To {agency.name} Profile
        </div>

        {/* Change Password button */}
        <Link to={"/change-password"}>
            <div
              className="flex sm:w-full md:w-[200px] flex-row gap-x-2 items-center mt-4 md:mt-0 justify-center text-white font-bold overflow-hidden md:text-[14px] sm:text-xs sm:px-2 py-2
            transition-all duration-200 border md:px-4 md:py-3 rounded-full bg-indigo-500 hover:bg-indigo-600"
            >
              <button className="text-white overflow-hidden">
                Change Password
              </button>
              <MdPassword className="text-white" />
            </div>
          </Link>

        {/* top box with edit profile button div */}
        <div className="w-11/12 lg:w-8/12 xl:w-8/12 flex flex-col md:flex-row sm:flex-col md:items-center justify-between rounded-md border border-gray-300 bg-white p-6 md:p-8 shadow-md">
          {/* Name and email div */}
          <div className="flex flex-col items-start justify-center gap-y-2">
            <div className="text-indigo-600 font-bold text-2xl">Basic Details</div>
            <div className="text-gray-700 text-lg font-bold mt-2">
              Name: {agency.name}
            </div>
            <div className="text-gray-700 text-lg font-bold">
              Email: {agency.email}
            </div>
            <div className="text-gray-700 text-lg font-bold">
              Mobile: {agency.phoneNumber}
            </div>
            <div className="text-gray-700 text-lg font-bold">
              Expertise: {agency.expertise}
            </div>
          </div>

          {/* Edit profile button section */}
          <Link to={"/update-profile"}>
            <div
              className="flex sm:w-full md:w-[200px] flex-row gap-x-2 items-center mt-4 md:mt-0 justify-center text-white font-bold overflow-hidden md:text-[14px] sm:text-xs sm:px-2 py-2
            transition-all duration-200 border md:px-4 md:py-3 rounded-full bg-indigo-500 hover:bg-indigo-600"
            >
              <button className="text-white overflow-hidden">
                Update Profile
              </button>
              <FiEdit2 className="text-white" />
            </div>
          </Link>
        </div>

        {/* Mid div Container for MapComponent */}
        <div className="w-full md:w-10/12 lg:w-9/12 xl:w-8/12 flex md:flex-row sm:flex-col gap-x-6 sm:gap-y-6 overflow-hidden items-center justify-center">
          {/* Address div */}
          <div className="w-11/12 bg-white md:w-1/2 border border-gray-300 shadow-lg rounded-md p-6 md:p-11">
            <p className="font-bold text-2xl text-indigo-600">
              Where We Are Located
            </p>
            <div className="text-gray-700 text-lg font-bold mt-2">
              <p>Street: {agency.contact.address.street}</p>
              <p>City: {agency.contact.address.city}</p>
              <p>State: {agency.contact.address.state}</p>
              <p>Country: {agency.contact.address.country}</p>
              <p>Postal Code: {agency.contact.address.postalCode}</p>
            </div>
            <Link to={"/update-profile"}>
              <div
                className="flex flex-row gap-x-2 items-center justify-center text-white font-bold md:text-[14px] sm:text-xs sm:px-2 py-2
            transition-all duration-200 mt-4 border md:px-4 md:py-3 rounded-full bg-indigo-500 hover:bg-indigo-600"
              >
                <button className="text-white overflow-hidden">
                  Update Location
                </button>
                <FiEdit2 className="text-white" />
              </div>
            </Link>
          </div>

          {/* Map div */}
          <div className="w-full md:w-1/2 sm:w-11/12 ">
            <MapComponent coordinates={coordinates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
