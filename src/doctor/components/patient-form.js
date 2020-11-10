import React from 'react';
import validate from "./validators/validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/patients_api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';
import { FormControl} from 'react-bootstrap';



class PatientForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: this.props.action === 'update',

            formControls: {
                name: {
                    value: this.props.action==='update'? this.props.name : null,
                    placeholder: 'Patient name',
                    valid: this.props.action === 'update',
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                birthdate: {
                    value: this.props.action==='update'? this.props.birthdate : null,
                    placeholder: 'Birthdate',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                gender: {
                    value: this.props.action==='update'? this.props.gender : null,
                    placeholder: 'Gender',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                address: {
                    value: this.props.action==='update'? this.props.address : null,
                    placeholder: 'City, Street, Number...',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                medical_record: {
                    value: this.props.action==='update'? this.props.medical_record : null,
                    placeholder: 'Medical record',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                caregiver: {
                    value: this.props.action==='update'? this.props.caregiver : null,
                    placeholder: 'Caregiver',
                    valid: true,
                    touched: false,
                },
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm() {
        this.setState({collapseForm: !this.state.collapseForm});
    }


    handleChange = event => {

        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = this.state.formControls;

        const updatedFormElement = updatedControls[name];

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let updatedFormElementName in updatedControls) {
            formIsValid = updatedControls[updatedFormElementName].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });

    };

    registerPatient(patient) {
        return API_USERS.postPatient(patient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted patient with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    updatePatient(patient, id) {
        return API_USERS.putPatient(id, patient, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated patient with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    handleSubmit() {
        let patient = {
            name: this.state.formControls.name.value,
            birthdate: this.state.formControls.birthdate.value,
            gender: this.state.formControls.gender.value,
            address: this.state.formControls.address.value,
            medical_record: this.state.formControls.medical_record.value,
            caregiver: this.state.formControls.caregiver.value
        };

        console.log(patient);
        this.props.action==='update' ? this.updatePatient(patient, this.props.id) : this.registerPatient(patient)

    }

    render() {
        return (
            <div>
                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField' placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>


                <FormGroup id='birthdate'>
                    <Label for='birthdateField'> Birthdate: </Label>
                    <Input type="date" name='birthdate' id='birthdateField' placeholder={this.state.formControls.birthdate.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.birthdate.value}
                           touched={this.state.formControls.birthdate.touched? 1 : 0}
                           valid={this.state.formControls.birthdate.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='gender'>
                    <Label for='genderField'> Gender: </Label>
                    <Input name='gender' id='genderField' placeholder={this.state.formControls.gender.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.gender.value}
                           touched={this.state.formControls.gender.touched? 1 : 0}
                           valid={this.state.formControls.gender.valid}
                           required
                    />
                    <FormControl
                        as="select"
                        className="mr-sm-2"
                        id="inlineFormCustomSelect"
                        custom
                        value={'none'}
                    >
                        <option value="0">Choose...</option>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </FormControl>
                </FormGroup>



                <FormGroup id='address'>
                    <Label for='addressField'> Address: </Label>
                    <Input name='address' id='addressField' placeholder={this.state.formControls.address.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.address.value}
                           touched={this.state.formControls.address.touched? 1 : 0}
                           valid={this.state.formControls.address.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='medical_record'>
                    <Label for='medical_recordField'> Medical record: </Label>
                    <Input name='medical_record' id='medical_recordField' placeholder={this.state.formControls.medical_record.placeholder}

                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.medical_record.value}
                           touched={this.state.formControls.medical_record.touched? 1 : 0}
                           valid={this.state.formControls.medical_record.valid}
                           required
                    />
                </FormGroup>
                <FormGroup id='caregiver'>
                    <Label for='caregiverField'> Caregiver: </Label>
                    <Input name='caregiver' id='caregiverField' placeholder={this.state.formControls.caregiver.placeholder}

                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.caregiver.value}
                           touched={this.state.formControls.caregiver.touched? 1 : 0}
                           valid={this.state.formControls.caregiver.valid}
                           required
                    />
                </FormGroup>

                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}>  Submit </Button>
                    </Col>
                </Row>

                {
                    this.state.errorStatus > 0 &&
                    <APIResponseErrorMessage errorStatus={this.state.errorStatus} error={this.state.error}/>
                }
            </div>
        ) ;
    }
}

export default PatientForm;
