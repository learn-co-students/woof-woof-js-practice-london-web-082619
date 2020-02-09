const API_ENDPOINT = "http://localhost:3000"
const PUPS_URL = `${API_ENDPOINT}/pups`

function getDogs(){
    return fetch(PUPS_URL).then(response => response.json())
}

function getDogDetails(dogID){
    let url = `${PUPS_URL}/${dogID}`
    return fetch(url).then(response => response.json())
}

function patchDog(dogID, configObject){
    let url = `${PUPS_URL}/${dogID}`

    return fetch(url, configObject).then(response => response.json())
}

function createConfigObject(bodyData, httpMethod){
    return {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(bodyData)
    }
}

const API = {
    getDogs,
    getDogDetails,
    createConfigObject, 
    patchDog
}