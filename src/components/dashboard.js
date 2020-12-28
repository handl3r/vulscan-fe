import React from "react";
import {getToken, getUser, removeUserAndToken} from "../utils/common";
import axios from "axios";

function Dashboard(props) {
    const user = getUser()
    const handleLogout = () => {
        removeUserAndToken();
        props.history.push('/login');
    }

    const getListProject = () => {
        const authStr = 'Bearer '.concat(getToken());
        let array = [];
        axios.get('http://localhost:9600/api/v1/user/projects', {headers: {'Authorization': authStr}})
            .then((response) => {
                for (let i = 0; i < response.data.length; i++) {
                    array.push(
                        <li> {response.data[i].name}</li>
                    );
                }
            }, (error) => {
                return error.response.status
            })
        return array
    }

    if (user != null) {
        return (
            <div>
                Welcome {user.email} <br/> <br/>
                <input type="button" onClick={handleLogout} value="Logout"/>
                <hr/>
                <div>
                    <h2>List Projects</h2>
                    <div>
                        <ul>
                            {getListProject()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

export default Dashboard;