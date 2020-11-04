import React from 'react';
import caregiver from '../commons/images/caregiver.ico';
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
import doctor from "../commons/images/doctor.ico";



class CaregiverContainer extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.toggleForm = this.toggleForm.bind(this);
    //     this.reload = this.reload.bind(this);
    //     this.handleDelete = this.handleDelete.bind(this);
    //     this.state = {
    //         selected: false,
    //         collapseForm: false,
    //         tableData: [],
    //         isLoaded: false,
    //         errorStatus: 0,
    //         error: null
    //     };
    // }
    //
    // componentDidMount() {
    //     this.fetchPersons();
    // }
    //
    // fetchPersons() {
    //     return API_USERS.getPersons((result, status, err) => {
    //
    //         if (result !== null && status === 200) {
    //             this.setState({
    //                 tableData: result,
    //                 isLoaded: true
    //             });
    //         } else {
    //             this.setState(({
    //                 errorStatus: status,
    //                 error: err
    //             }));
    //         }
    //     });
    // }
    //
    // deletePerson(id) {
    //
    //     return API_USERS.deletePerson(id,(result, status, err) => {
    //         if (result !== null && status === 200) {
    //             this.setState({
    //                 tableData: result,
    //                 isLoaded: false
    //
    //             });
    //
    //             this.fetchPersons();
    //         } else {
    //             this.setState(({
    //                 errorStatus: status,
    //                 error: err
    //             }));
    //         }
    //     });
    // }
    //
    // handleDelete(){
    //     let id = document.getElementById("id").value;
    //     this.deletePerson(id);
    //
    // }
    //
    // toggleForm() {
    //     this.setState({selected: !this.state.selected});
    // }
    //
    //
    // reload() {
    //     this.setState({
    //         isLoaded: false
    //     });
    //     this.toggleForm();
    //     this.fetchPersons();
    // }

    render() {
        return (
        <div>
            <CardHeader>
                <Row>
                    <Col>
                        <UncontrolledDropdown>
                            <DropdownToggle style={{color:"black", fontSize:"25px"} } nav caret>
                                Menu
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <NavLink href="/person">Persons</NavLink>
                                    <NavLink href="/doctor">Doctor</NavLink>
                                    <NavLink href="/patient">Patient</NavLink>
                                    <NavLink href="/caregiver">Caregiver</NavLink>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>
                    <strong style={{paddingTop:"8px",fontSize:"25px"} }> Caregiver </strong>
                    <img src={caregiver} width={"64px"}
                         height={"64px"}  alt={"Doctor icon"}/>
                </Row>
            </CardHeader>

        </div>
        )

    }
}


export default CaregiverContainer;