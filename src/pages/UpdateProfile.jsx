import React, { useEffect, useState } from "react";
import bgimg from "../assets/signup.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAccountInfo } from "../redux/Actions/profileAction";

const UpdateProfile = () => {

  const currentState = useSelector((state) => state.profile);
  const agency = useSelector((state) => state.profile.accountInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize state variables with empty values as a fallback
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [expertise, setExpertise] = useState("");

  // useEffect to set state variables when agency is available
  useEffect(() => {
    if (agency) {
      setName(agency.name);
      setEmail(agency.email);
      setStreet(agency.contact.address.street);
      setCity(agency.contact.address.city);
      setState(agency.contact.address.state);
      setPostalCode(agency.contact.address.postalCode);
      setCountry(agency.contact.address.country);
      setPhoneNumber(agency.phoneNumber);
      setExpertise(agency.expertise);
    }
  }, [agency]);
  const statesOfIndia = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create the nested contact object
    const contactData = {
      address: {
        street,
        city,
        state,
        postalCode,
        country,
      },
    };
    const user_data = {
      name,
      email,
      contact: contactData, // Assign the nested contact object
      phoneNumber,
      expertise,
    };
    dispatch(updateAccountInfo(user_data,navigate));
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-11/12 flex flex-col items-center justify-center lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col flex-wrap">
        {/* Left Section (Signup Form) */}
        <div className="lg:w-7/12  sm:w-full p-8">
          <h2 className="text-3xl overflow-hidden font-extrabold text-gray-900">
            Update Your Profile
          </h2>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Street */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="street" className="sr-only">
                  Street
                </label>
                <input
                  id="street"
                  name="contact.address.street" // Use nested structure
                  type="text"
                  autoComplete="street"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>

            {/* City */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="city" className="sr-only">
                  City
                </label>
                <input
                  id="city"
                  name="contact.address.city" // Use nested structure
                  type="text"
                  autoComplete="city"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* State */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="state" className="sr-only">
                  State
                </label>
                <select
                  id="state"
                  name="contact.address.state" // Use nested structure
                  autoComplete="state"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                >
                  <option value="">Select State</option>
                  {statesOfIndia.map((stateName) => (
                    <option key={stateName} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Postal Code */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="postalCode" className="sr-only">
                  Postal Code
                </label>
                <input
                  id="postalCode"
                  name="contact.address.postalCode" // Use nested structure
                  type="text"
                  autoComplete="postalCode"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
            </div>

            {/* Country */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <input
                  id="country"
                  name="contact.address.country" // Use nested structure
                  type="text"
                  autoComplete="country"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="phoneNumber" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Expertise */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="expertise" className="sr-only">
                  Expertise
                </label>
                <input
                  id="expertise"
                  name="expertise"
                  type="text"
                  autoComplete="expertise"
                  
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Expertise"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              {!currentState.loading ? (
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border
                   border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
                    hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                     focus:ring-indigo-500 transition-all duration-200"
                >
                  Make Changes
                </button>
              ) : (
                <div className="spinner w-full flex items-center justify-center"></div>
              )}
            </div>
          </form>
        </div>

        {/* Right Section (Image) */}
        <div className="lg:w-5/12 sm:hidden flex items-center justify-center">
          <img
            src={bgimg} // Replace with the actual image path
            alt="Agency"
            width="800px"
            className="object-cover ml-10 object-center sm:h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile
