import React from "react";
import "./index.css";
import callIcon from "../../assets/images/callIcon.png";
import msgIcon from "../../assets/images/msgIcon.png";
import emailIcon from "../../assets/images/emailIcon.png";

export const listImages = [callIcon, msgIcon, emailIcon];

const Footer = ({ bgColor }) => {
  const listImages = [callIcon, msgIcon, emailIcon];
  return (
    <div className="contact-icons" style={{ backgroundColor: bgColor }}>
      {listImages.map((data) => {
        return (
          <img
            className="image-space"
            src={data}
            width={25}
            height={25}
            alt={"Icons"}
          />
        );
      })}
    </div>
  );
};

export default Footer;
