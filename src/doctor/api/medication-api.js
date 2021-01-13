import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    medication: 'api/medication'
};

function getMedication(callback) {
    let request = new Request(endpoint.medication, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        }

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function deleteMedication(id, callback) {
    let request = new Request( endpoint.medication + '/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }

    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function getMedicationById(params, callback){
    let request = new Request(endpoint.medication + params.id, {
       method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        }

    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

function putMedication(id, user, callback){
    let request = new Request( endpoint.medication + '/' + id, {
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

function postMedication(user, callback){
    let request = new Request(endpoint.medication, {
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
    getMedication,
    getMedicationById,
    postMedication,
    putMedication,
    deleteMedication
};
