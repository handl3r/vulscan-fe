import * as React from "react";
import {MimiSegment} from "./mimiSegment";
import {getToken} from "../../utils/common";
import axios from "axios";
import {MiniProject} from "../dashboard/miniProject";

export class DetailsProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectID: props.projectID,
            miniProject: null,
            segments: [],
            message: null
        }
    }

    componentDidMount() {
        const authStr = 'Bearer '.concat(getToken().toString())
        let url = "http://localhost:9600/api/v1/projects/".concat(this.state.projectID.toString())
        axios.get(url, {headers: {'Authorization': authStr}})
            .then((response) => {

                    this.setState({
                        segments: response.data.segments.map((segment) =>
                            <MimiSegment
                                id={segment.id} isCrawling={segment.is_crawling.toString()}
                                isScanned={segment.is_scanned.toString()}
                                scanningStatus={segment.scanning_status} createdAt={segment.created_at}
                                targetNumber={segment.target_number}
                                vulNumber={segment.vul_number} projectID={segment.project_id}
                            />
                        )

                    });
                    this.setState({
                        miniProject: <MiniProject
                            id={response.data.id} name={response.data.name}
                            domain={response.data.domain} vulNumber={response.data.vul_number}
                        />
                    });
                }, (error) => {
                    this.setState({message: error.response.data})
                }
            )
    }

    render() {
        return (
            <div className="detail-project">
                <div className="project-info">
                    <div>Project</div>
                    <div>{this.state.miniProject}</div>
                </div>
                <div className="segments-info">
                    <div>Segments</div>
                    <hr/>
                    <div>{this.state.segments}</div>
                </div>
            </div>
        )
    }
}