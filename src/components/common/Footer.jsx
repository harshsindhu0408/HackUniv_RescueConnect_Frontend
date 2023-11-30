import React from "react";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const iconStyle = {
    fontSize: "40px",
    margin: "10px",
  };

  return (
    <footer className="bg-gray-800 relative text-white shadow-lg py-6">
      <div className="w-11/12 container mx-auto flex flex-col lg:flex-row justify-between items-center h-full">

        {/* left div with logo and name */}
        <div className="flex flex-row items-start justify-center">
          <div className="md:flex flex-row items-start justify-start sm:hidden">
            <img src={logo} alt="logo" width="60px" />
          </div>
          <div className="text-lg mb-4 md:mb-0 text-center md:text-left">
            <Link to={'/'}>
            <div className="md:text-4xl sm:text-2xl font-bold overflow-hidden ml-2">
              RescueConnect
            </div>
            </Link>
            <p className="md:w-[400px] ml-2 mt-4 opacity-90 sm:text-sm">
              We Rescue the people in Need with unwavering dedication, providing
              assistance, hope, and support during times of crisis, ensuring a
              safer and more resilient world for all
            </p>
          </div>
        </div>

        {/* Central div with links */}
        <div className="flex flex-row gap-x-16 mt-2 mb-2 items-center justify-center">
          <div>
            <ul className="space-y-2 md:font-bold  font-Roborto">
              <li>
                <Link to="/disasters">Disasters</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 md:font-bold  font-Roborto">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/agencies">Agencies</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Rightmost div with icons */}
        <div>
          <ul className="flex space-x-4">
            <li>
              <a style={iconStyle} href="/">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a style={iconStyle} href="/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
            <li>
              <a style={iconStyle} href="/">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
