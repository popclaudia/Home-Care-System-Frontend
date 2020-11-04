import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    medication: '/medication'
};

function getMedication(callback) {
    let request = new Request(HOST.backend_api + endpoint.medication, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteMedication(id, callback) {
    let request = new Request(HOST.backend_api + endpoint.medication + '/' + id, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + params.id, {
       method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function putMedication(id, user, callback){
    let request = new Request(HOST.backend_api + endpoint.medication + '/' + id, {
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

function postMedication(user, callback){
    let request = new Request(HOST.backend_api + endpoint.medication, {
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
    getMedication,
    getMedicationById,
    postMedication,
    putMedication,
    deleteMedication
};
