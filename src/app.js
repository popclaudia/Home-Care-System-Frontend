import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './navigation-bar'
import Home from './home/home';
import PersonContainer from './person/person-container'
import Login from './login/login';
import DoctorContainer from './doctor/doctor_container';
import PatientContainer from './patient/patient_container';
import CaregiverContainer from './caregiver/caregiver_container';

import ErrorPage from './commons/errorhandling/error-page';
import styles from './commons/styles/project-style.css';
import PatientsCRUD from "./doctor/patients";
import CaregiversCRUD from "./doctor/caregivers";
import MedicationCRUD from "./doctor/medication";
import Unauthorized from "./commons/errorhandling/unauthorized-page";

class App extends React.Component {


    render() {

        return (
            <div className={styles.back}>
            <Router>
                <div>
                    <NavigationBar />
                    <Switch>

                        <Route
                            exact
                            path='/'
                            render={() => <Home/>}
                        />

                        <Route
                            exact
                            path='/person'
                            render={() =>  <PersonContainer/>}
                        />

                        <Route
                            exact
                            path='/doctor'
                            render={() => sessionStorage.getItem("role")==="Doctor"?
                                <DoctorContainer/>
                                :
                                <Unauthorized/>}
                        />

                        <Route
                            exact
                            path='/doctor/patients'
                            render={() => sessionStorage.getItem("role")==="Doctor"?
                                <PatientsCRUD/>
                                :
                                <Unauthorized/>}
                        />

                        <Route
                            exact
                            path='/doctor/caregivers'
                            render={() => sessionStorage.getItem("role")==="Doctor"?
                                <CaregiversCRUD/>
                                :
                                <Unauthorized/> }
                        />

                        <Route
                            exact
                            path='/doctor/medication'
                            render={() => sessionStorage.getItem("role")==="Doctor"?
                                <MedicationCRUD/>
                                :
                                <Unauthorized/>}
                        />

                        <Route
                            exact
                            path='/patient'
                            render={() => sessionStorage.getItem("role")==="Patient"?
                                <PatientContainer/>
                                :
                                <Unauthorized/>}
                        />

                        <Route
                            exact
                            path='/caregiver'
                            render={() => sessionStorage.getItem("role")==="CareGiver"?
                                <CaregiverContainer/>
                                :
                                <Unauthorized/>}
                        />

                        <Route
                            exact
                            path='/login'
                            render={() => <Login/>}
                        />

                        <Route
                            exact
                            path='/unauthorized'
                            render={() => <Unauthorized/>}
                        />

                        {/*Error*/}
                        <Route
                            exact
                            path='/error'
                            render={() => <ErrorPage/>}
                        />

                        <Route render={() =><ErrorPage/>} />
                    </Switch>
                </div>
            </Router>
            </div>
        )
    };
}

export default App
