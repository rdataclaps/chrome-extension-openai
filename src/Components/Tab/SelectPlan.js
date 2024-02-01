import React from "react";
import { BsCheckLg } from "react-icons/bs";

function SelectPlan() {
  return (
    <>
      <div className="row mt-4">
        <div className="col-lg-4">
          <div className="buy_card">
            <div className="header">
              <h1>100 Credits</h1>
              <h1>$5</h1>
            </div>
            <div className="btn_area">
              <button className="btn">Buy</button>
            </div>
            <div className="info">
              <ul>
                <li>
                  <BsCheckLg className="icons" />
                  <span>5000</span> Recorded Sessions
                </li>
                <li>
                  <BsCheckLg className="icons" />
                  <span>1</span> Website
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="buy_card">
            <div className="header">
              <h1>200 Credits</h1>
              <h1>$10</h1>
            </div>
            <div className="btn_area">
              <button className="btn">Buy</button>
            </div>
            <div className="info">
              <ul>
                <li>
                  <BsCheckLg className="icons" />
                  <span>5000</span> Recorded Sessions
                </li>
                <li>
                  <BsCheckLg className="icons" />
                  <span>1</span> Website
                </li>
                <li>
                  <BsCheckLg className="icons" />
                  <span>3</span> Months Of Storage
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="buy_card">
            <div className="header">
              <h1>300 Credits</h1>
              <h1>$15</h1>
            </div>
            <div className="btn_area">
              <button className="btn">Buy</button>
            </div>
            <div className="info">
              <ul>
                <li>
                  <BsCheckLg className="icons" />
                  <span>50000</span> Recorded Sessions
                </li>
                <li>
                  <BsCheckLg className="icons" />
                  <span>5</span> Website
                </li>
                <li>
                  <BsCheckLg className="icons" />
                  <span>6</span> Months Of Storage
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectPlan;
