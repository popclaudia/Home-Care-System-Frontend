import {HOST} from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    medicationPlan: '/api/medicationplan'
};

function postMedicationPlan(medicationPlan, callback){
    let request = new Request(endpoint.medicationPlan, {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem("token")
        },
        body: JSON.stringify(medicationPlan)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);
}

export{
    postMedicationPlan
}
