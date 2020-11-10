import React from 'react';
import validate from "./validators/validators";
//import Button from "react-bootstrap/Button";
import * as API_USERS from "../api/medication-plan-api";
import * as API_MED from "../api/medication-api";
import APIResponseErrorMessage from "../../commons/errorhandling/api-response-error-message";
import {Col, Row} from "reactstrap";
import { Button, FormGroup, Input, Label} from 'reactstrap';
import MedicationTable from "./medication-table";

class PlanForm extends React.Component {

    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.reloadHandler = this.props.reloadHandler;
        this.handleSelectRow= this.handleSelectRow.bind(this);
        this.handleAdd= this.handleAdd.bind(this);
        this.handleRemove= this.handleRemove.bind(this);

        this.state = {
            errorStatus: 0,
            error: null,
            isLoaded: false,
            formIsValid: false,
            selectedRow:false,
            medication:{
                name: null,
                side_effects: null,
                dosage: null
            },
            selected: [],
            tableData: [],
            added: false,
            formControls: {
                intervals: {
                    value: '',
                    placeholder: 'Medication: intervals \nMedication: intervals',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 3,
                        isRequired: true
                    }
                },
                treatment_period: {
                    value: '',
                    placeholder: 'DD/MM/YYYY - DD/MM/YYYY',
                    valid: false,
                    touched: false,
                },

            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchMedication();
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


    fetchMedication() {
        return API_MED.getMedication((result, status, err) => {

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
        this.state.id=id.id
        this.setState({
            selectedRow:true,
            medication:{
                name: id.name,
                side_effects: id.side_effects,
                dosage: id.dosage
            }
        })

    }

    registerPlan(medicationPlan) {
        return API_USERS.postMedicationPlan(medicationPlan, (result, status, error) => {
            if (result !== null && (status === 200 || status === 201)) {
                console.log("Successfully created medication plan with id: " + result);
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

        let medicationPlan = {
            intervals: this.state.formControls.intervals.value,
            treatment_period: this.state.formControls.treatment_period.value,
            patient: this.props.id,
            medication:this.state.selected
        }

        console.log(medicationPlan);
         this.registerPlan(medicationPlan)
    }

    handleAdd(){

        this.setState(state => {
            const list = state.selected.push(this.state.id)

            return {
                list,
                value: '',
            };
        });
    }

    handleRemove(){
        this.setState({
            selected : this.state.selected.filter(x => x !== this.state.id)
        })
    }

    render() {
        return (
            <div>
                <Row>
                <Col xs="5">
                <FormGroup id='intervals'>
                    <Label for='intervalsField'> Medication and Intervals: </Label><br/>
                    <Button disabled={!this.state.selectedRow} color="success" onClick={this.handleAdd}>  Add selected medication </Button>
                    <Button disabled={!this.state.selectedRow} color="secondary" onClick={this.handleRemove}>  Remove selected medication </Button>
                    <br/>
                    <Label>{this.state.selected}</Label>
                    {this.state.selected.length>0 &&
                    <div className={"info"}> * Add intervals for every medication selected </div>}
                    <br/>
                    <Input type="textarea"  name='intervals' id='intervalsField'  placeholder={this.state.formControls.intervals.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.intervals.value}
                           touched={this.state.formControls.intervals.touched? 1 : 0}
                           valid={this.state.formControls.intervals.valid}
                           required
                    />
                    {this.state.formControls.intervals.touched && !this.state.formControls.intervals.valid &&
                    <div className={"error-message row"}> * Name must have at least 3 characters </div>}
                </FormGroup>

                    <FormGroup id='treatment_period'>
                    <Label for='treatment_periodField'> Treatment period: </Label>
                    <Input name='treatment_period' id='treatment_periodField' placeholder={this.state.formControls.treatment_period.placeholder}
                           onChange={this.handleChange}
                           defaultValue={this.state.formControls.treatment_period.value}
                           touched={this.state.formControls.treatment_period.touched? 1 : 0}
                           valid={this.state.formControls.treatment_period.valid}
                           required
                    />
                </FormGroup>

                </Col>
                <Col xs="7">
                    {this.state.isLoaded && <MedicationTable tableData = {this.state.tableData}
                                                             handleSelectRow={this.handleSelectRow.bind(this)}
                    />}
                    {this.state.errorStatus > 0 && <APIResponseErrorMessage
                        errorStatus={this.state.errorStatus}
                        error={this.state.error}
                    />   }
                </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                    <Col sm={{size: '4', offset: 8}}>
                        <Button color='primary' type={"submit"} disabled={!this.state.formIsValid} onClick={this.handleSubmit}> Create </Button>
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

export default PlanForm;
