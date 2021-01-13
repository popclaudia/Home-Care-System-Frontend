import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";
import axios from 'axios'
const endpoint = {
    patient: '/api/patient'
};


// axios.interceptors.request.use(
//     config =>{
//         config.headers.Authorization = 'Bearer ' + sessionStorage.getItem("token");
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

function getPatient(callback) {



    // callback = axios.get(HOST.backend_api + endpoint.patient )
    // // alert(sessionStorage.getItem("token"))
    //HOST.backend_api +
    let request = new Request( endpoint.patient, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': "*",
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),

        },


    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deletePatient(id, callback) {
    let request = new Request(endpoint.patient + '/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '  + sessionStorage.getItem("token"),

        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientById(id, callback){
    let request = new Request( endpoint.patient + '/' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function putPatient(id, user, callback){
    let request = new Request( endpoint.patient + '/' + id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")

        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function postPatient(user, callback){
    let request = new Request(endpoint.patient, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")

        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export {
    getPatient,
    getPatientById,
    postPatient,
    putPatient,
    deletePatient
};
