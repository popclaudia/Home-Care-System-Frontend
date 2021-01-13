import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    patient: '/patient/caregiver'
};

function getPatientsByCg(id, callback) {
    let request = new Request(endpoint.patient + '/' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '  + sessionStorage.getItem("token"),

        }
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export {
    getPatientsByCg
}