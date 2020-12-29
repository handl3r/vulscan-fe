import * as React from "react";
import {getToken, getUser} from "../../utils/common";
import axios from "axios";
import {MiniProject} from "./miniProject";

export class ListProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {listProject: null};
    }

    componentDidMount() {
        const user = getUser()
        if (user != null) {
            const authStr = 'Bearer '.concat(getToken().toString())
            axios.get('http://localhost:9600/api/v1/user/projects', {headers: {'Authorization': authStr}})
                .then((response) => {
                    this.setState({
                        listProject: response.data.map((project) =>
                            <MiniProject key={project.id.toString()} id={project.id} name={project.name}
                                         domain={project.domain}
                                         vulNumber={project.vul_number}/>
                        )
                    })
                })
        }
    }

    render() {
        return (
            <div>
                {this.state.listProject}
            </div>
        )
    }
}