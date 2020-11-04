import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    caregiver: '/caregiver'
};

function getCaregiver(callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteCaregiver(id, callback) {
    let request = new Request(HOST.backend_api + endpoint.caregiver + '/' + id, {
        method: 'DELETE',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + params.id, {
        method: 'GET'
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function putCaregiver(id, user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver + '/' + id, {
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

function postCaregiver(user, callback){
    let request = new Request(HOST.backend_api + endpoint.caregiver, {
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
    getCaregiver,
    getCaregiverById,
    postCaregiver,
    putCaregiver,
    deleteCaregiver
};
