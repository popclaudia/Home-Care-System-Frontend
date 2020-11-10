import React from 'react';
import caregiver from '../commons/images/caregiver.ico';
import {
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import * as API_USERS from "./api/patients-api";
import PatientsTable from "../doctor/components/patients_table";



class CaregiverContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedRow:false,
        };
    }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients() {
        return API_USERS.getPatientsByCg(sessionStorage.getItem("id"), (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleSelectRow(id) {
        this.setState({
                selectedRow:true
            }
        )
    }


    render() {
        return (
            <div>
                <CardHeader>
                    <Row>
                        <Col>

                        </Col>
                        <strong style={{paddingTop:"8px",fontSize:"25px"} }> Caregiver </strong>
                        <img src={caregiver} width={"64px"}
                             height={"64px"}  alt={"Doctor icon"}/>
                    </Row>
                </CardHeader>

                <Row style={{backgroundColor:"white"}}>

                    <Col  sm={{size: '10', offset: 1}}>
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                        {this.state.isLoaded && <PatientsTable tableData = {this.state.tableData}
                                                               handleSelectRow={this.handleSelectRow.bind(this)}
                        />}
                    </Col>
                </Row>

            </div>
        )

    }
}


export default CaregiverContainer;