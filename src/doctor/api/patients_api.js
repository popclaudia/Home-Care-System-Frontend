import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    patient: '/patient'
};

function getPatient(callback) {
    let request = new Request(HOST.backend_api + endpoint.patient, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deletePatient(id, callback) {
    let request = new Request(HOST.backend_api + endpoint.patient + '/' + id, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getPatientById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function putPatient(id, user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + '/' + id, {
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

function postPatient(user, callback){
    let request = new Request(HOST.backend_api + endpoint.patient, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
