import React, { useState } from "react";
// import UsersTable from "../Components/Table/UsersTable";
import { useSelector } from "react-redux";
// import AddUserModal from "../Components/Table/AddUserModal";
import InviteMemberDialogBox from "../Components/DialogBox/InviteMemberDialogBox";
import MembersTable from "../Components/Table/MembersTable";
import Cookies from 'js-cookie';
//import WorkspaceNameEdit from "../Components/DialogBox/WorkspaceNameEdit";

function Workspace() {
    const teams = useSelector(state => state.workspace.teams);
    // const team = useSelector(state => state.user.userData?.team);
    const role_str = Cookies.get('role');
    const role = role_str ? JSON.parse(role_str) : null;
    const [workspaceDetail , setWokspaceDetail ]  = useState(role?.team);
    const workspaceDetailEdit = (data) => {
        setWokspaceDetail(data);
    }

    return (
        <div className="user_page">
            {/* <div className="section_workspace" style={{ marginBottom: '20px' }}>
                <div className="workspace_title_main" style={{ display: 'flex', gap:'5px' }}>
                    <h2>{team?.name}</h2>
                    {
                        (team ? <WorkspaceNameEdit openFor={'edit'} workspaceDetailEdit={workspaceDetailEdit}/> : <WorkspaceNameEdit openFor={'add'} />)
                    }
                </div>
                <span style={{ fontSize: '16px' }}>{team?.description}</span>
            </div> */}
            <div className="section_title section_title_row">
                <h5>Members</h5>
                {role?.role==='admin'&&<div className="btn_area" style={{ cursor: 'pointer' }}>
                    <InviteMemberDialogBox />
                </div>}
            </div>
            <div className="table_area mt-2">
                <MembersTable />
            </div>
        </div>
    );
}

export default Workspace;
