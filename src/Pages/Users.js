import React from "react";
import UsersTable from "../Components/Table/UsersTable";
import { useSelector } from "react-redux";
//import AddUserModal from "../Components/Table/AddUserModal";
import { BiUserPlus } from "react-icons/bi";

function Users() {
  const customers = useSelector(state => state.customer.customers);
  return (
    <div className="user_page">
      <div className="section_title section_title_row">
        <h2>Users({customers?.length ? customers.length : 0})</h2>
        <div className="btn_area" style={{ cursor:'pointer'}}>
          {/* <AddUserModal /> */}
          <span className="ex_title" ><BiUserPlus className="icons"/></span>
        </div>
      </div>
      <div className="table_area mt-2">
        <UsersTable/>
      </div>
    </div>
  );
}

export default Users;
