import React from "react";
import {Button, Card, Container, FormGroup, Label, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import PersonTable from "../person/components/person-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import PersonForm from "../person/components/person-form";
import './login.css'
import '../general.css'


class Login extends React.Component{


    render() {
        return (
            <div>
                <br/>
                <Container  className={"Login"} md={{ size: 6, offset: 3 }}>
                    <br/>
                    <br/>
                    <h2 className={"text-center"}>Log In Here</h2>
                    <br/>
                    <Col md={{ size: 6, offset: 3 }}>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="username" name="username" id="username" placeholder="username" />
                        </FormGroup>
                    </Col>
                    <br/>
                    <Col  md={{ size: 6, offset: 3 }}>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>
                    </Col>
                    <br/>
                    <br/>
                    <Col className={"text-center"}>
                        <Button size={"lg"} id={"button"}>Login</Button>
                    </Col>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </Container>
            </div>
        )

    }

}

export default Login