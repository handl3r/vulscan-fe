import * as React from "react";
import {Link} from "react-router-dom";

export class MiniProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: props.id, vulNumber: props.vulNumber, name: props.name, domain: props.domain};
    }

    render() {
        return (
            <ul>
                <li><Link to={"/projects/".concat(this.state.id.toString())}>Click here to
                    access</Link></li>
                <li>Name : {this.state.name}</li>
                <li>ID : {this.state.id}</li>
                <li>Domain : {this.state.domain}</li>
                <li>VulNumber : {this.state.vulNumber}</li>
            </ul>
        )
    }
}