import * as React from "react";
import {Link} from "react-router-dom";

export class MimiSegment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id, isCrawling: props.isCrawling, isScanned: props.isScanned,
            scanningStatus: props.scanningStatus, createdAt: props.createdAt, targetNumber: props.targetNumber,
            vulNumber: props.vulNumber, projectID: props.projectID
        };
    }

    render() {
        return (
            <div>
                <li><Link to={"/segments/".concat(this.state.id.toString())}>Click here to
                    access</Link></li>
                <div><span>ID: </span> {this.state.id}</div>
                <div><span>Is Crawling: </span> {this.state.isCrawling}</div>
                <div><span>Is Scanned: </span> {this.state.isScanned}</div>
                <div><span>Scanning Status: </span> {this.state.scanningStatus}</div>
                <div><span>Created Time: </span> {this.state.createdAt}</div>
                <div><span>Target Number: </span> {this.state.targetNumber}</div>
                <div><span>Vul Number: </span> {this.state.vulNumber}</div>
                <hr/>
            </div>
        )
    }
}