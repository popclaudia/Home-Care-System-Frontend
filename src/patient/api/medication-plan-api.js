import {HOST} from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    medicationPlan: '/medicationplan'
};

function getMedicationPlans(idPatient, callback){
    let request = new Request(HOST.backend_api + endpoint.medicationPlan + '/patient/' + idPatient, {
        method: 'GET',
    });
    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export{
    getMedicationPlans
}