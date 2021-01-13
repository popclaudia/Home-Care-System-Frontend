import React from 'react';
import caregiver from '../commons/images/caregiver.ico';
import notification from '../commons/images/Alecive-Flatwoken-Apps-Notifications.ico';
import {
    CardHeader,
    Col,
    Row
} from 'reactstrap';
import * as API_USERS from "./api/patients-api";
import PatientsTable from "../doctor/components/patients_table";
import SockJsClient from 'react-stomp'
import SelectList from 'react-select'
import '../general.css';

class CaregiverContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            collapseForm: false,
            tableData: [],
            isLoaded: false,
            errorStatus: 0,
            error: null,
            selectedRow:false,
            warning: ["No notification"],
            notification: " ",
            show: "hidden"
        };
        this.toggle= this.toggle.bind(this);
    }

    componentDidMount() {
        this.fetchPatients();
    }

    fetchPatients() {
        return API_USERS.getPatientsByCg(sessionStorage.getItem("id"), (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData: result,
                    isLoaded: true
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handleSelectRow(id) {
        this.setState({
                selectedRow:true
            }
        )
    }

    notification(){

        let node = document.createElement("li");
        let textnode = document.createTextNode(this.state.notification);
        node.appendChild(textnode);
        document.getElementById("no").style.border="3px solid red"
        document.getElementById("no").style.borderRadius="10px"
        document.getElementById("message_list").appendChild(node)

    }

    toggle(){
        this.setState({show: this.state.show === "hidden"? "visible" : "hidden"});
        document.getElementById("no").style.border="0px"
    }
    render() {
        return (
            <div>
                <CardHeader>
                    <Row>
                        <Col>

                        </Col>
                        <strong style={{paddingTop:"8px",fontSize:"25px"} }> Caregiver </strong>
                        <img src={caregiver} width={"64px"}
                             height={"64px"}  alt={"Doctor icon"}/>
                    </Row>
                </CardHeader>

                <SockJsClient url='https://spring-assignment-1.herokuapp.com/notify/'
                              topics={['/queue/notification/'+sessionStorage.getItem("id")]}
                              onConnect={() => {
                                  console.log("connected");
                              }}
                              onDisconnect={() => {
                                  console.log("Disconnected");
                              }}
                              onMessage={(msg) => {
                                  this.state.warning.push(new Date().toLocaleString() + ": " +msg);
                                  this.setState({
                                      notification: new Date().toLocaleString() + ": " + msg
                                  })
                                  this.notification();
                                  console.log(msg)
                              }}
                              ref={(client) => {
                                  this.clientRef = client
                              }}/>

                <Row style={{backgroundColor:"white"}}>

                    <Col  sm={{size: '10', offset: 1}}>
                        <div>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                        {this.state.isLoaded && <PatientsTable tableData = {this.state.tableData}
                                                               handleSelectRow={this.handleSelectRow.bind(this)}
                        />}
                    </Col>
                </Row>
                <Row style={{backgroundColor:"#00000000", position: "fixed",
                    top: '85px',
                    left: '50px'}}>
                    <img src={notification} width={"50px"} id={"no"}
                         height={"50px"}  alt={"Doctor icon"}
                    onClick={this.toggle}/>
                     <div id={"notify"} style={{visibility: this.state.show, backgroundColor:"#fff1e2", borderRadius:'10px', boxShadow:"5px 5px #44444433"}}>
                        <br/>
                        <ul id = "message_list" style={{ paddingRight:'30px', listStyleType:"none", color:"red", fontSize:"large" ,fontWeight:"bold"}}>
                        </ul>
                    </div>
                </Row>

            </div>
        )

    }
}


export default CaregiverContainer;
