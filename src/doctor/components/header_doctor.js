import {
    CardHeader,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    NavLink,
    Row,
    UncontrolledDropdown
} from "reactstrap";
import doctor from "../../commons/images/doctor.ico";
import React from "react";


const HeaderDoctor = () => (
    <div>
        <CardHeader>
            <Row>
                <Col>
                    <UncontrolledDropdown >
                        <DropdownToggle style={{color:"black", fontSize:"25px"} } nav caret>
                            Menu
                        </DropdownToggle>
                        <DropdownMenu >
                            <DropdownItem >
                                <NavLink style={{color:"black"}} href="/doctor/patients">Patients</NavLink>
                            </DropdownItem>
                            <DropdownItem >
                                <NavLink style={{color:"black"}} href="/doctor/caregivers">Caregivers</NavLink>
                            </DropdownItem>
                            <DropdownItem >
                                <NavLink style={{color:"black"}} href="/doctor/medication">Medication</NavLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Col>
                <strong style={{paddingTop:"8px",fontSize:"25px"} }> Doctor </strong>
                <img src={doctor} width={"64px"}
                     height={"64px"}  alt={"Doctor icon"}/>
            </Row>
        </CardHeader>


    </div>

);

export default HeaderDoctor