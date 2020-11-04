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
                            render={() => <PersonContainer/>}
                        />

                        <Route
                            exact
                            path='/doctor'
                            render={() => <DoctorContainer/>}
                        />

                        <Route
                            exact
                            path='/doctor/patients'
                            render={() => <PatientsCRUD/>}
                        />

                        <Route
                            exact
                            path='/doctor/caregivers'
                            render={() => <CaregiversCRUD/>}
                        />

                        <Route
                            exact
                            path='/doctor/medication'
                            render={() => <MedicationCRUD/>}
                        />

                        <Route
                            exact
                            path='/patient'
                            render={() => <PatientContainer/>}
                        />

                        <Route
                            exact
                            path='/caregiver'
                            render={() => <CaregiverContainer/>}
                        />

                        <Route
                            exact
                            path='/login'
                            render={() => <Login/>}
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
