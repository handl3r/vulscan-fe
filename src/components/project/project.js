import {getUser, removeUserAndToken} from "../../utils/common";
import React from "react";
import {DetailsProject} from "./detailsProject";

export function Project(props) {
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
                <DetailsProject projectID={props.match.params.id}/>
            </div>
        )
    }
}