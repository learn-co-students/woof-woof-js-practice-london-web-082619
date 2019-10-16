CONFIG = {
    BASE_URL: "http://localhost:3000/pups/"
}

// GET REQUEST

const getPups = () => {
    return fetch(`${CONFIG.BASE_URL}`)
        .then(response => response.json())
}

// PATCH REQUEST

const configurationObject = pupData => {
    return {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(pupData)
    }
}

const patchPup = (pupData) => {
    return fetch(`${CONFIG.BASE_URL}${pupData.id}`, configurationObject(pupData))
        .then(response => response.json())
}

const 

api = { getPups, patchPup}