import React from "react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";

const SocialMediaLinks = () => {
  return (
    <div>
      <a
        href="https://www.instagram.com/your-instagram-profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram className="icon" size={32} color="#dc3030" />
      </a>
      <a
        href="https://www.facebook.com/your-facebook-profile"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebook className="icon" size={32} color="blue" />
      </a>
      <a
        href="https://www.youtube.com/your-youtube-channel"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaYoutube className="icon" size={32} color="#dc3030" />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
