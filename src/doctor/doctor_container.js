import React, { useState } from 'react';
import {Col} from 'reactstrap'

import HeaderDoctor from './components/header_doctor'

class DoctorContainer extends React.Component {

    render() {
        return (
            <div>
                <HeaderDoctor/>
                <div style={{backgroundColor:"white"}}>
                <Col   sm={{offset: 1}} >
                    <br/>
                    <h1 > Hello Doctor!</h1>
                </Col>
                </div>
            </div>

        )

    }
}


export default DoctorContainer;