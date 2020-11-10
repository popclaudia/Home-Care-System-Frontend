import React, { useState } from 'react';

import HeaderDoctor from './components/header_doctor'

class DoctorContainer extends React.Component {

    render() {
        return (
            <div>
                <HeaderDoctor/>
                <h1 style={{backgroundColor:"white"}}> Hello Doctor!</h1>
            </div>

        )

    }
}


export default DoctorContainer;