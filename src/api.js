API_URL = "http://localhost:3000/pups";


const getDogs= ()=>{
    return fetch(API_URL)
    .then(resp => resp.json());
}

const patch = (dog)=>{
    return fetch(`${API_URL}/${dog.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dog)
    })
}

const API = {
    getDogs,
    patch
}
