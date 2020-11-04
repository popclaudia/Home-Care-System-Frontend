import React from "react";
import HeaderDoctor from "./components/header_doctor";
import {Button, Card, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import MedicationTable from "./components/medication-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import MedicationForm from "./components/medication-form";
import * as API_USERS from "./api/medication-api";
import getId from "../commons/tables/table";

const inactiveStyle = {
    color: 'white',
    textDecoration: 'none'
};

class MedicationCRUD extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reload = this.reload.bind(this);
        this.handleSelectRow= this.handleSelectRow.bind(this);
        this.handleDelete= this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleAdd= this.handleAdd.bind(this);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedRow:false,
            id: null,
            medication:{
                name: null,
                side_effects: null,
                dosage: null

            },
            action: null
        };
    }

    componentDidMount() {
        this.fetchMedication();
    }


    fetchMedication() {
        return API_USERS.getMedication((result, status, err) => {

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

    deleteMedication(id) {

        return API_USERS.deleteMedication(id, (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: false

                });
                this.fetchMedication();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    toggleForm() {
        this.setState({selected: !this.state.selected});
    }

    handleDelete(){
        this.deleteMedication(this.state.id)
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
    reload() {
        this.setState({
            isLoaded: false
        });
        this.toggleForm();
        this.fetchMedication();
    }

    handleSelectRow(id) {
        this.setState({
            selectedRow:true,
            id: id.id,
            medication:{
                name: id.name,
                side_effects: id.side_effects,
                dosage: id.dosage
            }
        })

    }

    render() {
        return (
            <div>
                <HeaderDoctor/>
                <Card>
                    <br/>
                    <Row>
                        <Col sm={{size: '8', offset: 1}}>
                            <Button color="success" size={"lg"} onClick={this.handleAdd}>Add medication </Button>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col sm={{size: '7', offset: 1}}>
                            {this.state.isLoaded && <MedicationTable tableData = {this.state.tableData}
                                                                     handleSelectRow={this.handleSelectRow.bind(this)}
                                                                      />}
                            {this.state.errorStatus > 0 && <APIResponseErrorMessage
                                errorStatus={this.state.errorStatus}
                                error={this.state.error}
                            />   }
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="8" md={{ size: 6, offset: 3 }}>
                            <Button disabled={!this.state.selectedRow} color="warning" size={"lg"} onClick={this.handleDelete}>Delete Medication</Button>
                            <Button disabled={!this.state.selectedRow} color="info" size={"lg"} onClick={this.handleUpdate}>Update Medication</Button>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Card>

                <Modal isOpen={this.state.selected} toggle={this.toggleForm}
                       className={this.props.className} size="lg">
                    <ModalHeader toggle={this.toggleForm}> Add Medication: </ModalHeader>
                    <ModalBody>
                        <MedicationForm reloadHandler={this.reload}
                                        name={this.state.medication.name}
                                        side_effects={this.state.medication.side_effects}
                                        dosage={this.state.medication.dosage}
                                        id={ this.state.id}
                                        action={this.state.action}


                        />
                    </ModalBody>
                </Modal>


            </div>
        );
    }
}
export default MedicationCRUD;