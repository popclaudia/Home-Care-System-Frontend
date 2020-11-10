import React from "react";
import HeaderDoctor from "./components/header_doctor";
import {Button, Card, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import CaregiversTable from "./components/caregivers-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import CaregiverForm from "./components/caregiver-form";
import * as API_USERS from "./api/caregivers-api";

class CaregiversCRUD extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd= this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.managePatients = this.managePatients.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedRow:false,
            id: null,
            caregiver:{
                name: null,
                birthdate: null,
                gender: null,
                address: null

            },
            action: null
        };
    }

    componentDidMount() {
        this.fetchCaregivers();
    }

    fetchCaregivers() {
        return API_USERS.getCaregiver((result, status, err) => {

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

    deleteCaregiver(id) {

        return API_USERS.deleteCaregiver(id,(result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: false

                });

                this.fetchCaregivers();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleDelete(){
        this.deleteCaregiver(this.state.id)
    }

    handleUpdate(){
        this.setState({
            action: 'update'
        });
        this.toggleForm()
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
            caregiver:{
                name: id.name,
                birthdate: id.birthdate,
                gender: id.gender,
                address: id.address
            }
        })

    }

    managePatients(){

    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchCaregivers();
    }

    render() {
        return (
            <div>
                <HeaderDoctor/>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="success" size={"lg"} onClick={this.handleAdd}>Add caregiver </Button>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col sm={{size: '7', offset: 1}}>
                            {this.state.isLoaded && <CaregiversTable
                                tableData = {this.state.tableData}
                                handleSelectRow={this.handleSelectRow.bind(this)}
                            />}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="8" md={{ size: 6, offset: 2 }}>
                            <Button disabled={!this.state.selectedRow} color="warning" size={"lg"} onClick={this.handleDelete}>Delete Caregiver</Button>
                            <Button disabled={!this.state.selectedRow} color="info" size={"lg"} onClick={this.handleUpdate}>Update Caregiver</Button>
                            <Button disabled={!this.state.selectedRow} color="primary" size={"lg"} href="/doctor/patients" >Manage Patients</Button>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Card>
                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Manage Caregiver: </ModalHeader>
                    <ModalBody>
                        <CaregiverForm reloadHandler={this.reload}
                                       name={this.state.caregiver.name}
                                       birthdate={this.state.caregiver.birthdate}
                                       gender={this.state.caregiver.gender}
                                       address={this.state.caregiver.address}
                                       id={ this.state.id}
                                       action={this.state.action}
                        />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default CaregiversCRUD;