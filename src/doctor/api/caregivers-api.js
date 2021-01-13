import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    caregiver: 'api/caregiver'
};

function getCaregiver(callback) {
    let request = new Request(endpoint.caregiver, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteCaregiver(id, callback) {
    let request = new Request( endpoint.caregiver + '/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getCaregiverById(params, callback){
    let request = new Request( endpoint.caregiver + params.id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }
    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function putCaregiver(id, user, callback){
    let request = new Request(endpoint.caregiver + '/' + id, {
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

function postCaregiver(user, callback){
    let request = new Request(endpoint.caregiver, {
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
    getCaregiver,
    getCaregiverById,
    postCaregiver,
    putCaregiver,
    deleteCaregiver
};
