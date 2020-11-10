import React from 'react'
import styles from '../styles/project-style.css';
import HeaderDoctor from "../../doctor/components/header_doctor";
import {Button, Col, Container} from "reactstrap";
class Unauthorized extends React.Component {

    handleClick(){
        sessionStorage.clear();
    }

    render() {
        return(
            <div>
                <br/>
                <br/>
                <br/>
            <Col sm="18" md={{ size: 4, offset: 4 }}>
                 <h1 style={{color:"red"}}>Access denied!</h1>
                <br/>
                <Button size={"lg"} color={"warning"} onClick={this.handleClick} href={"/login"}> Go to login</Button>
            </Col>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )

    };
}

export default Unauthorized
