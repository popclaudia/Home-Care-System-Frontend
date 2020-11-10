import React from 'react';
import patient from '../commons/images/Patient.ico';
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import {
    Button,
    Card,
    CardHeader,
    Col,
    Modal,
    Input,
    ModalBody,
    ModalHeader,
    Row, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink
} from 'reactstrap';
import caregiver from "../commons/images/caregiver.ico";
import * as API_USERS from "../doctor/api/patients_api";
import * as API_PLAN from "./api/medication-plan-api";
import PatientsTable from "../doctor/components/patients_table";
import PlanTable from "./components/plan-table";




class PatientContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            collapseForm: false,
            patientData: null,
            tableData: null,
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedRow:false,
        };
    }


    componentDidMount() {
        this.fetchPatientData();
        this.fetchMedicationPlans();

    }

    fetchPatientData() {
        return API_USERS.getPatientById(sessionStorage.getItem("id"), (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    patientData: result
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }


    fetchMedicationPlans() {
        return API_PLAN.getMedicationPlans(sessionStorage.getItem("id"), (result, status, err) => {
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


    renderData(){
        //alert(this.state.patientData)
        return(
            <div style={{fontSize:'24px'}}>
                <Row>
                    <Col sm={{offset: 1, size:4}}>
                        <h2>Name</h2>
                        <p >
                            {this.state.patientData.name}
                        </p>
                        <h2>Birthdate</h2>
                        <p>
                            {this.state.patientData.birthdate.substring(0,10)}
                        </p>
                        <h2>Gender</h2>
                        <p>
                            {this.state.patientData.gender}
                        </p>
                        <h2>Address</h2>
                        <p>
                            {this.state.patientData.address}
                        </p>
                        <h2>Medical record</h2>
                        <p>
                            {this.state.patientData.medical_record}
                        </p>
                        <h2>Caregiver</h2>
                        <p>
                            {this.state.patientData.caregiver}
                            . {this.state.patientData.caregivername}
                        </p>
                    </Col>
                    <Col sm={{offset:0, size:7}}>
                        <h2>Medical plans:</h2>
                        {this.state.isLoaded && <PlanTable tableData = {this.state.tableData}
                                                            handleSelectRow={this.handleSelectRow.bind(this)}/>}

                    </Col>
                </Row>

            </div>
        )
    }

    render() {
        return (
            <div>
                <CardHeader>
                    <Row>
                        <Col>
                        </Col>
                        <strong style={{paddingTop:"8px",fontSize:"25px"} }> Patient </strong>
                        <img src={patient} width={"64px"}
                             height={"64px"}  alt={"Doctor icon"}/>
                    </Row>
                </CardHeader>
                <Row>
                    <Col style={{backgroundColor: 'white'}}>
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                        { this.state.patientData!=null && this.renderData()}
                    </Col>
                </Row>
            </div>
        )

    }
}


export default PatientContainer;