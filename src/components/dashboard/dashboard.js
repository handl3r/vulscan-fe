import React from "react";
import {getUser, removeUserAndToken} from "../../utils/common";
import {ListProject} from "./listProject";
import {CreateProject} from "./createProject";

function Dashboard(props) {
    const user = getUser()
    const handleLogout = () => {
        removeUserAndToken();
        props.history.push('/login');
    }

    if (user != null) {
        return (
            <div>
                Welcome {user.email} <br/> <br/>
                <input type="button" onClick={handleLogout} value="Logout"/>
                <hr/>
                <div className="listAction">
                    <h2>Actions</h2>
                    <CreateProject/>
                </div>
                <div className="list-project">
                    <h2>List Projects</h2>
                    <ListProject/>
                </div>
            </div>
        );
    }

}

export default Dashboard;