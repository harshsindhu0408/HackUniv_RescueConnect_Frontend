import React, { useState } from "react";
import bgimg from "../../assets/vecteezy_3d-male-character-happy-working-on-a-laptop_24387907_314.png";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../redux/Actions/authAction"; // Import your updatePassword action
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.warning("New password and confirm new password do not match.");
      return;
    }

    // Dispatch the updatePassword action with the new password
    dispatch(
      updatePassword({ oldpassword: oldPassword, newpassword: newPassword })
    );

    // Clear the input fields
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    navigate('/');
  };

  return (
    <div className="mx-auto w-9/12 flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Left div with password changes */}
      {state.loading ? (
        <div className="spinner flex w-full items-center justify-center"></div>
      ) : (
        <div className="w-full md:w-1/2 lg:w-2/3 xl:w-2/3 2xl:w-2/3 gap-y-6 md:gap-y-0 flex flex-col items-center justify-center md:items-start">
          <p className="text-4xl text-center sm:h-auto font-Roborto mb-4 font-bold overflow-hidden md:text-left font-roboto">
            Change Your Password
          </p>
          <form onSubmit={handleSubmit} className="w-full md:w-[400px]">
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block mb-2">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmNewPassword" className="block mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div className="text-center md:text-left">
              <button
                type="submit"
                className="bg-indigo-500 mt-4 sm:w-full text-white transition-all duration-200 px-4 py-2 rounded-full hover:bg-indigo-600"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Right div with image */}
      <div className="hidden md:block w-full md:w-1/2 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
        <img src={bgimg} alt="sfg" width="800px" />
      </div>
    </div>
  );
};

export default ChangePassword;
