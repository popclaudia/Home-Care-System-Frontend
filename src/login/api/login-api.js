import {HOST} from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    patient: '/user'
};

function getUserByUsername(user, pass, callback){

    let u ={
        username: user,
        password: pass
    }
    //HOST.backend_api +
    let request = new Request( endpoint.patient + "/login", {
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(u)
    });

    console.log("URL: " + request.url);

    RestApiClient.performRequest(request, callback);

}

export{

    getUserByUsername

}