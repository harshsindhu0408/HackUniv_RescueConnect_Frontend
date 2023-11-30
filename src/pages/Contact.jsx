import React, { useState } from "react";
import bgimg from "./../assets/contact-us.png";
const Contact = () => {
  const [users, setUsers] = useState({
    name: "",
    email: "",
    phone: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsers((user) => ({ ...user, [name]: value }));
    // console.log(users);
  };

  const [records, setRecords] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecords = { ...users };
    setRecords([...records, newRecords]);
    // console.log(users);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 min-h-screen">
      <div className="w-11/12 flex flex-col items-center justify-center lg:flex-row xl:flex-row 2xl:flex-row sm:flex-col flex-wrap">
        {/* Left section contact form */}
        <div className="lg:w-7/12  sm:w-full p-8">
          <h2 className="text-3xl overflow-hidden font-extrabold text-gray-900 truncate">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Full name */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/*  */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* contact number */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Contact Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="phone"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                  onChange={handleChange}
                />
              </div>
            </div>
            <textarea
              cols="10"
              rows="5"
              name="comment"
              id="comment"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Write your message..."
              onChange={handleChange}
            ></textarea>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium 
                rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2
                 focus:ring-indigo-500 transition-all duration-200"
              >
                Send
              </button>
            </div>
          </form>
        </div>
        {/* right section  */}
        <div className="lg:w-5/12  sm:w-full flex items-center justify-center">
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
};

export default Contact;
