import React from "react";
import {Button, Card, Container, FormGroup, Label, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row} from "reactstrap";
import PersonTable from "../person/components/person-table";
import APIResponseErrorMessage from "../commons/errorhandling/api-response-error-message";
import PersonForm from "../person/components/person-form";
import './login.css'
import '../general.css'
import * as API_USERS from "./api/login-api";
import { Redirect} from 'react-router-dom';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            user: null,
            ok: false,
            errorStatus: 0,
            error: null,
            data: false
        }
    }

    checkCredentials(user, pass){

            return API_USERS.getUserByUsername(user, pass, (result, status, err) => {

                if (result !== null && status === 200) {
                    this.setState({
                        errorStatus: status,
                        user: result,
                    });
                    this.handleFormSubmit();
                } else {
                    this.setState(({
                        errorStatus: status,
                        error: err
                    }));
                }
            });
    }


    handleLogin(){
        let user = document.getElementById('username').value;
        let pass = document.getElementById('password').value;
        this.checkCredentials(user, pass);


    }

    handleFormSubmit()  {
        if(this.state.errorStatus===200) {
            sessionStorage.setItem('user', this.state.user);
            sessionStorage.setItem('id', this.state.user.user);
            sessionStorage.setItem('role', this.state.user.role);
            this.setState({
                data:true,
            })
        }
        else
            sessionStorage.setItem('user', null);
    };

    handleRoleRedirect = () =>{
        {
            if(sessionStorage.getItem("role")==="Doctor")
                return(
                     <Redirect to='/doctor'/>)
            if(sessionStorage.getItem("role")==="Patient")
                return(
                     <Redirect to='/patient'/>)
            if(sessionStorage.getItem("role")==="CareGiver")
                return(
                     <Redirect to='/caregiver'/>)
        }

    }


    render() {
        return (
            <div style={{backgroundColor:'white'}}>
                <br/>
                <br/>
                <Container  className={"Login"} md={{ size: 6, offset: 3 }}>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1 className={"text-center"}>Log In Here</h1>
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
                    <br/>
                    <Col className={"text-center"}>
                        <Button size={"lg"} id={"button"} onClick={this.handleLogin}>Login</Button>
                        {this.state.data && this.handleRoleRedirect()}
                        {this.state.errorStatus>250 &&
                        <div style={{color: "red", fontSize: "26px"}}  className={"error-message"}> * Wrong username or password!</div>}

                    </Col>
                    <br/>
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