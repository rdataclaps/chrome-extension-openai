import React from "react";
import { Link } from "react-router-dom";
import InputField from "../Components/InputField/InputField";
import { useSelector } from "react-redux";

function Billing() {
  const credits = useSelector(state => state.user.userData?.credit)
  return (
    <div className="Billing_page">
      <div className="section_title">
        <h2>Billing</h2>
      </div>
      <div className="row mt-5">
        <div className="col-lg-8">
          <div className="input_area">
            <h3 className="mb-4">Plan</h3>
            <p style={{marginBottom: '10px'}}>Credits</p>
            <p style={{padding: '10px', backgroundColor: "#24293C", color: 'white', borderRadius: '8px'}}>{credits && parseInt(credits)}</p>
            {/* <InputField label="Credits" placeholder={credits && parseInt(credits)} /> */}
            <Link to="/buy-credits">
              <button className="btn mt-4">Buy Credits</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
