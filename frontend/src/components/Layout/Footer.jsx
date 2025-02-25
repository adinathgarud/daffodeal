import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineTwitter,
} from "react-icons/ai";
import logo from "../../Assests/images/Deffodeal.png"
import YouTube from '../../Assests/images/youtube.png';
import FaceBook from '../../Assests/images/facebook.png'
import Instagram from '../../Assests/images/instagram.png'
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#143d59] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#143d59] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#f9ff00]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#f9ff00] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-gray-800 md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src={logo}
            alt=""
            // style={{ filter: "brightness(0) invert(0)" }}
          />
          <br />
          <p>The home and elements needeed to create beautiful products.</p>
          <div className="flex items-center mt-[15px]">
            <img src= {FaceBook} 
             size={25}
             style={{ marginLeft: "15px", cursor: "pointer", width: "40px" }}
            />
            <img src={Instagram}
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", width: "45px" }}
            />
            {/* <img src={Instagram}
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", width: "40px" }}
            /> */}
            <img src={YouTube}
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer", width: "40px" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 Azown Tech. All rights reserved.</span>
        <Link to={"/privacy-policy"}>
        <span>Terms · Privacy Policy</span>
        </Link>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
