import React, { useState } from "react";
import Selector from "../Components/Selector/Selector";
import { Link } from "react-router-dom";
import Toggle from "../Components/Toggle/Toggle";
import TimezonePicker from "../Components/TimezonePicker/TimezonePicker";

function MyProfile() {
  const [userRole, setUserRole] = useState(null);
  const [language, setLanguage] = useState(null);

  const handleRollChange = (userRole) => {
    setUserRole(userRole);
    console.log(`Selected User Role: ${userRole.label}`);
  };

  const handleLangChange = (language) => {
    setLanguage(language);
    console.log(`Selected Language: ${language.label}`);
  };

  const roll = [
    { value: "1", label: "Admin'" },
  ];

  const lang = [
    { value: "en", label: "English" },
    { value: "fr", label: "French" },
    { value: "es", label: "Spanish" },
  ];


  return (
    <div className="my_profile_page">
      <div className="section_title">
        <h2>My Profile</h2>
      </div>
      <div className="row mt-4">
        <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="selector_area">
            <div className="selector_item">
              <label htmlFor="">User Role</label>
              <Selector
                placeholder="Select User Role"
                options={roll}
                onChange={handleRollChange}
                value={userRole}
              />
            </div>
            <div className="selector_item mt-3">
              <label htmlFor="">Language</label>
              <Selector
                placeholder="Select Language"
                options={lang}
                onChange={handleLangChange}
                value={language}
              />
            </div>
            <div className="selector_item mt-3">
              <label htmlFor="">Time Zone</label>
              <TimezonePicker/>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
          <div className="toggle_area">
            <h3>Email Subscriptions</h3>
            <div className="item">
              <p>Website</p> <p>Weekly Email</p>
            </div>
            <div className="item">
              <Link to="https://www.askmail.com">www.askmail.com</Link>
              <Toggle/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
