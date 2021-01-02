import * as React from "react";
import axios from "axios";
import {getToken} from "../../utils/common";
import {MimiSegment} from "./mimiSegment";


export class CreateSegment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listNewSegment: [],
            projectID: props.projectID,
            depthLevel: 0,
            isLoadByJS: "",
            scanSegmentID: null,
            message: "",
            scanMessage: ""
        }
        this.handleClickButtonDiscover = this.handleClickButtonDiscover.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClickScanButton = this.handleClickScanButton.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        if (target.id === "depth-level") {
            this.setState({depthLevel: parseInt(target.value, 10)})
        } else if (target.id === "is-load-by-js") {
            this.setState({isLoadByJS: target.value})
        } else if (target.id === "input-segment") {
            this.setState({scanSegmentID: target.value})
        }
    }

    handleClickScanButton() {
        if (this.state.scanSegmentID === null) {
            this.setState({scanMessage: "Empty segmentID"})
            return
        }
        axios.post("http://localhost:9600/api/v1/scan",
            {
                segment_id: this.state.scanSegmentID,
                level: 1
            },
            {
                headers: {'Authorization': 'Bearer '.concat(getToken().toString())}
            }
        ).then((response) => {
            this.setState({scanMessage: "Scan segment successfully ".concat(response.data.id)})
        }, (error) => {
            this.setState({scanMessage: error.response.data})
        })
    }

    handleClickButtonDiscover() {
        if (this.state.depthLevel === null) {
            this.setState({message: "Empty depthLevel"})
            return
        }
        if (this.state.isLoadByJS === null) {
            this.setState({message: "Empty isLoadByJS"})
            return
        }
        if (this.state.isLoadByJS !== "static" && this.state.isLoadByJS !== "dynamic") {
            this.setState({message: "Invalid isLoadByJS, it should be static or dynamic"})
            return
        }
        axios.post(
            "http://localhost:9600/api/v1/discover",
            {
                project_id: this.state.projectID,
                depth_level: this.state.depthLevel,
                is_load_by_js: this.state.isLoadByJS
            },
            {
                headers: {'Authorization': 'Bearer '.concat(getToken().toString())}
            }
        ).then((response) => {
            this.setState({message: "Scan project successfully with segment id ".concat(response.data.id)})
            let listNewSegment = this.state.listNewSegment
            listNewSegment.push(
                <MimiSegment id={response.data.id} isCrawling={response.data.is_crawling.toString()}
                             isScanned={response.data.is_scanned.toString()}
                             scanningStatus={response.data.scanning_status} createdAt={response.data.created_at}
                />
            )
            this.setState({listNewSegment: listNewSegment})
        }, (error => {
            this.setState({message: error.response.data})
        }))
    }


    render() {
        return (
            <div>
                <div>Depth Level(0 is discover all path)</div>
                <input type="number" id="depth-level" onChange={this.handleInputChange}/>
                <div>LoadType (static/dynamic)</div>
                <input type="text" id="is-load-by-js" onChange={this.handleInputChange}/>
                <div><input type="button" value='Discover URLs' onClick={this.handleClickButtonDiscover}/></div>
                <br/>
                {this.state.message && <><small style={{color: 'red'}}>{this.state.message}</small><br/> </>}<br/>

                <div>SegmentID</div>
                <input type="text" id="input-segment" onChange={this.handleInputChange}/>
                <div><input type="button" value='Scan' onClick={this.handleClickScanButton}/></div>
                <br/>
                {this.state.scanMessage && <><small
                    style={{color: 'red'}}>{this.state.scanMessage}</small><br/> </>}<br/>
                <div id="new-project">
                    {this.state.listNewSegment}
                </div>
            </div>
        )
    }
}