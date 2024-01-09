import React from "react";
import "./index.css";
import Footer from "../Footer/index";

const NodeData = ({ name, role, id, profile }) => {
  return (
    <div className="card-part" id={id} key={id}>
      <div className="details">
        <div className="profile-photo">
          <img width={80} height={80} src={profile} alt={"profile"} />
        </div>
        <p>
          {name + " "}-{" " + role}
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default NodeData;
