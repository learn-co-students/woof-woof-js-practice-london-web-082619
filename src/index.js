document.addEventListener('DOMContentLoaded', () => displayPupsInBar())

// API

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
// how to call a patch function from the API file??



// CONSTANTS

const dogBarDiv = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
const filterBtn = document.querySelector('#good-dog-filter')


// FUNCTIONALITY

let goodPups = []
let allPups = []

function displayPupsInBar(){
    API.get.then(pups => {
        pups.forEach( pup => {
            renderPup(pup)
            allPups.push(pup)
            if(pup.isGoodDog===true){goodPups.push(pup)}
        })
    })
}

function renderPup(pup){
    span = document.createElement('span')
    span.innerText = pup.name
    span.id = pup.name
    span.addEventListener('click', () => displayPupInfo(pup))
    dogBarDiv.appendChild(span)
}

function displayPupInfo(pup){
    while(dogInfoDiv.firstChild) dogInfoDiv.removeChild(dogInfoDiv.firstChild)

    h2 = document.createElement('h2')
    h2.innerText = pup.name

    image = document.createElement('img')
    image.src = pup.image

    btn = document.createElement('button')
    btn.innerText = btnName(pup)
    btn.addEventListener('click', () => btnFunction(pup))

    dogInfoDiv.append(h2, image, btn)
}

function btnName (pup){
    if(pup.isGoodDog){return 'Good Dog!'}
    else{ return 'Bad Dog!'}
}

function btnFunction(pup){
    let dataChange = Boolean
    if(pup.isGoodDog){ dataChange = false}
    else{ dataChange = true}
    patch(pup.id, dataChange).then(pup => {
        displayPupInfo(pup)
        allPups[pup.id-1].isGoodDog = dataChange
        })
    if(filterBtn.innerText == 'Filter good dogs: ON'){
        dogBarDiv.removeChild(document.querySelector(`#${pup.name}`))
    }
    }


// BONUS FUNCTIONALITY

filterBtn.addEventListener('click', () => filterBtnFunctionality(allPups))

function filterBtnFunctionality(pups){
    if(filterBtn.innerText == 'Filter good dogs: OFF'){
        filterBtn.innerText = 'Filter good dogs: ON'
        dogBarDiv.innerText = ""
        renderGoodPups(pups)
    }
    else if(filterBtn.innerText == 'Filter good dogs: ON'){
        filterBtn.innerText = 'Filter good dogs: OFF'
        dogBarDiv.innerText = ""
        pups.forEach( pup => renderPup(pup))
    }
}

function renderGoodPups(pups){
    let goodPups = pups.filter(p => p.isGoodDog === true)
    goodPups.forEach( pup => renderPup(pup))
}









// helper functions

function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
 }

