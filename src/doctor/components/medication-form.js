import React from 'react';
import validate from "./validators/validators";
import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/medication-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { FormGroup, Input, Label} from 'reactstrap';

class MedicationForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;

        this.state = {

            errorStatus: 0,
            error: null,

            formIsValid: this.props.action === 'update',

            medication:{
                id: this.props,
                name: null,
                side_effects: null,
                dosage: null

            },

            formControls: {
                name: {
                    value: this.props.action==='update'? this.props.name : null,
                    placeholder: 'What is the medication name?',
                    valid: this.props.action === 'update',
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                side_effects: {
                    value: this.props.action==='update'? this.props.side_effects : null,
                    placeholder: 'Side effects',
                    valid: this.props.action === 'update',
                    touched: false,
                },
                dosage: {
                    value: this.props.action==='update'? this.props.dosage : null ,
                    placeholder: 'Dosage...',
                    valid: this.props.action === 'update',
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

    registerMedication(medication) {
        return API_USERS.postMedication(medication, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully inserted medication with id: " + result);
                this.reloadHandler();
            } else {
                this.setState(({
                    errorStatus: status,
                    error: error
                }));
            }
        });
    }

    updateMedication(medication, id) {
        return API_USERS.putMedication(id, medication, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully updated medication with id: " + result);
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

        let medication = {
            name: this.state.formControls.name.value,
            side_effects: this.state.formControls.side_effects.value,
            dosage: this.state.formControls.dosage.value
        }

        console.log(medication);
        this.props.action==='update' ? this.updateMedication(medication, this.props.id) : this.registerMedication(medication)
    }

    render() {
        return (
            <div>

                <FormGroup id='name'>
                    <Label for='nameField'> Name: </Label>
                    <Input name='name' id='nameField'  placeholder={this.state.formControls.name.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.name.value}
                           touched={this.state.formControls.name.touched? 1 : 0}
                           valid={this.state.formControls.name.valid}
                           required
                    />
                    {this.state.formControls.name.touched && !this.state.formControls.name.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                <FormGroup id='side_effects'>
                    <Label for='side_effectsField'> Side effects: </Label>
                    <Input name='side_effects' id='side_effectsField' placeholder={this.state.formControls.side_effects.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.side_effects.value}
                           touched={this.state.formControls.side_effects.touched? 1 : 0}
                           valid={this.state.formControls.side_effects.valid}
                           required
                    />
                </FormGroup>

                <FormGroup id='dosage'>
                    <Label for='dosageField'> Dosage: </Label>
                    <Input name='dosage' id='dosageField' placeholder={this.state.formControls.dosage.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.dosage.value}
                           touched={this.state.formControls.dosage.touched? 1 : 0}
                           valid={this.state.formControls.dosage.valid}
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

export default MedicationForm;
