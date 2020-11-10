import React from 'react'
import logo from './commons/images/icon.png';

import {

    Nav,
    Navbar,
    Button,
    NavbarBrand,
} from 'reactstrap';
import {func} from "prop-types";

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};

function logOut() {
    sessionStorage.clear();

}

const NavigationBar = () => (
    <div>
        <Navbar color="dark" light expand="md">
            <NavbarBrand href="/">
                <img src={logo} width={"50"}
                     height={"35"} />
            </NavbarBrand>
            <Nav className="mr-auto" navbar>

                {/*<UncontrolledDropdown nav inNavbar>*/}
                {/*    <DropdownToggle style={textStyle} nav caret>*/}
                {/*       Menu*/}
                {/*    </DropdownToggle>*/}
                {/*    <DropdownMenu right >*/}

                {/*        <DropdownItem>*/}
                {/*            <NavLink href="/person">Persons</NavLink>*/}
                {/*            <NavLink href="/doctor">Doctor</NavLink>*/}
                {/*            <NavLink href="/patient">Patient</NavLink>*/}
                {/*            <NavLink href="/caregiver">Caregiver</NavLink>*/}
                {/*        </DropdownItem>*/}


                {/*    </DropdownMenu>*/}
                {/*</UncontrolledDropdown>*/}

            </Nav>
            { sessionStorage.getItem("role")===null?
                <Button size="lg" color="info" href="/login">Log in</Button>
                :
                <Button size="lg" color="info" href="/" onClick={logOut}>Log out</Button>
            }
        </Navbar>
    </div>
);

export default NavigationBar
