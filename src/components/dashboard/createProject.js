import * as React from "react";
import axios from "axios";
import {getToken} from "../../utils/common";


export class CreateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {domain: "", name: "", message: ""};
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        if (target.id ===  "domain-input") {
            this.setState({domain: target.value})
        } else if (target.id === "name-input") {
            this.setState({name: target.value})
        }
    }

    handleClick() {
        if (this.state.domain == null) {
            this.setState({message: "Empty domain"})
            return
        }
        axios.post("http://localhost:9600/api/v1/projects",
            {
                name: this.state.name,
                domain: this.state.domain
            },
            {
                headers: {'Authorization': 'Bearer '.concat(getToken().toString())}
            }
        ).then((response) => {
            this.setState({message: "Create project successfully with id ".concat(response.data.id)})
        }, (error) => {
            this.setState({message: error.response.data})
        })
    }

    render() {
        return (
            <div>
                <div>Domain</div>
                <input type="text" id="domain-input" onChange={this.handleInputChange}/>
                <div>Name</div>
                <input type="text" id={"name-input"} onChange={this.handleInputChange} />
                <div><input type="button" value='Create' onClick={this.handleClick}/></div>
                <br/>
                {this.state.message && <><small style={{color: 'red'}}>{this.state.message}</small><br/> </>}<br/>
            </div>
        )
    }

}