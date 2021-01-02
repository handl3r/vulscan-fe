import * as React from "react";
import axios from "axios";
import {getToken} from "../../utils/common";
import {MiniTarget} from "./miniTarget";
import {MiniVul} from "./miniVul";


export class DetailsSegment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {segmentID: props.segmentID, vuls: [], targets: [], hiddenTarget: true}
        this.handleClickShowTarget = this.handleClickShowTarget.bind(this)
    }

    componentDidMount() {
        console.log(this.state.segmentID)
        const authStr = 'Bearer '.concat(getToken().toString())
        let url = "http://localhost:9600/api/v1/segments/".concat(this.state.segmentID.toString())
        axios.get(url, {headers: {'Authorization': authStr}})
            .then((response) => {
                    this.setState({
                        vuls: response.data.vuls.map((vul) =>
                            <MiniVul id={vul.id} targetID={vul.target_id} rawURL={vul.raw_url} method={vul.method}/>
                        )
                    });
                    console.log(this.state.vuls);
                    this.setState({
                        targets: response.data.targets.map((target) =>
                            <MiniTarget id={target.id} rawURL={target.raw_url} method={target.method}/>
                        )
                    });
                }, (error) => {
                    this.setState({message: error.response.data})
                }
            )
    }

    handleClickShowTarget() {
        this.setState({hiddenTarget: !this.state.hiddenTarget})
    }


    render() {
        return (
            <div>
                <div>
                    <h2>Vuls</h2>
                    {this.state.vuls}
                </div>
                <h2>Targets</h2>
                <small onClick={this.handleClickShowTarget} id="hidden-target">(click to show)</small>
                <div hidden={this.state.hiddenTarget}>
                    {this.state.targets}
                </div>
            </div>
        )
    }
}