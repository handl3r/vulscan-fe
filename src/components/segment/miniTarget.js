import * as React from "react";


export class MiniTarget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {id: props.id, rawURL: props.rawURL, method: props.method}
    }

    render() {
        return (
            <div>
                <div><span>ID: </span> {this.state.id}</div>
                <div><span>RawURL: </span> {this.state.rawURL}</div>
                <div><span>Method: </span> {this.state.method}</div>
                <hr/>
            </div>
        )
    }
}