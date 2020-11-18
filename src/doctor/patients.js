import React from "react";
import HeaderDoctor from "./components/header_doctor";
import {Button, Card, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import PatientForm from "./components/patient-form";
import PatientsTable from "./components/patients_table";
import * as API_USERS from "./api/patients_api";
import PlanForm from "./components/plan-form";


class PatientsCRUD extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.togglePlanForm = this.togglePlanForm.bind(this);
        this.reload = this.reload.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd= this.handleAdd.bind(this);
        this.handleCreation = this.handleCreation.bind(this);
        this.state = {
            selected: false,
            selectedp: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedRow:false,
            id: null,
            patient:{
                name: null,
                birthdate: null,
                gender: null,
                address: null,
                medical_record: null,
                caregiver: null

            },
            action: null
        };
    }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients() {
        return API_USERS.getPatient((result, status, err) => {
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

    deletePatient(id) {
        return API_USERS.deletePatient(id,(result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: false
                });
                this.fetchPatients();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete(){
        this.deletePatient(this.state.id)
    }

    handleUpdate(){
        this.setState({
            action: 'update'
        });
        this.toggleForm()
    }

    handleCreation(){
        this.togglePlanForm()
    }

    handleAdd(){
        this.setState({
            action: 'add'
        });
        this.toggleForm()
    }

    handleSelectRow(id) {
        this.setState({
            selectedRow:true,
            id: id.id,
            patient:{
                name: id.name,
                birthdate: id.birthdate,
                gender: id.gender,
                address: id.address,
                medical_record: id.medical_record,
                caregiver: id.caregiver

            }
        })

    }


    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    togglePlanForm() {
        this.setState({selectedp: !this.state.selectedp});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchPatients();
    }

    render() {
        return (
            <div>
                <HeaderDoctor/>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color='success' size={"lg"} onClick={this.handleAdd}>Add patient </Button>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col sm={{size: '9', offset: 1}}>
                            {this.state.isLoaded && <PatientsTable tableData = {this.state.tableData}
                                                                   handleSelectRow={this.handleSelectRow.bind(this)}
                            />}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="9" md={{ size: 8, offset: 3 }}>
                            <Button disabled={!this.state.selectedRow} color="warning" size={"lg"} onClick={this.handleDelete}>Delete Patient</Button>
                            <Button disabled={!this.state.selectedRow} color="info" size={"lg"} onClick={this.handleUpdate}>Update Patient</Button>
                            <Button disabled={!this.state.selectedRow} color="primary" size={"lg"} onClick={this.handleCreation}>Create medication plan</Button>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Manage Patient: </ModalHeader>
                    <ModalBody>
                        <PatientForm reloadHandler={this.reload}
                                     name={this.state.patient.name}
                                     birthdate={this.state.patient.birthdate}
                                     gender={this.state.patient.gender}
                                     address={this.state.patient.address}
                                     medical_record={this.state.patient.medical_record}
                                     caregiver={this.state.patient.caregiver}
                                     id={ this.state.id}
                                     action={this.state.action}
                        />
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.selectedp} toggle={this.togglePlanForm}
                       className={this.props.className} size={'xl'}>
                    <ModalHeader toggle={this.togglePlanForm}> Create medication plan for {this.state.patient.name}: </ModalHeader>
                    <ModalBody>
                        <PlanForm reloadHandler={this.togglePlanForm}
                                     id={ this.state.id}
                        />
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}
export default PatientsCRUD;