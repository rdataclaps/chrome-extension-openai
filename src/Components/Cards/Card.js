import React from "react";

const Card = ({ icon, title, Ticon, valu, status, Sicon, cName }) => {
  return (
    <div className="dashboard_card">
      <div className={`card ${cName}`}>
        <div className="card-body">
          <div className="card_icons">
            <img src={icon} alt="" />
          </div>
          <p>{title}</p>
          <h1>{valu}</h1>
          <p className="status">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
