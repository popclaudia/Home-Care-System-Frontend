import {HOST} from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    patient: '/user'
};

function getUserByUsername(user, pass, callback){
    let request = new Request(HOST.backend_api + endpoint.patient + "/get/" + user + "/" + pass, {
        method: 'GET',

    });

    console.log(request.url);
    RestApiClient.performRequest(request, callback);
}

export{

    getUserByUsername

}