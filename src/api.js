
// CONSTANTS

const baseURL = "http://localhost:3000/pups/"
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
}

// API FUNCTIONALITY

function get(){
    return fetch(baseURL).then(resp => resp.json())
}

function patch(pupId, dataChange){
    return fetch(baseURL+`${pupId}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
            isGoodDog: dataChange
        })
    })
    .then(resp => resp.json())
}


const API = {
    get: get(),
    patch: patch
}
