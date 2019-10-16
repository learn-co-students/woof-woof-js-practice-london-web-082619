const dogFilter = document.querySelector('#good-dog-filter')

const createPups = () => {
    api.getPups().then(renderDogBar)
}

const findDogBar = document.querySelector("#dog-bar")

const renderDogBar = pupInfo => {
    findDogBar.innerText = ""

    for (const pup of pupInfo) {
        const dogSpan = document.createElement("span")
        dogSpan.innerText = pup.name
        dogSpan.id = `dog-${pup.id}`
        findDogBar.appendChild(dogSpan)
        dogSpan.addEventListener("click", () => createDogInfoContainer(pup))
    }

}

const dogInfoContainer = document.querySelector("#dog-info")
const createDogInfoContainer = pup => {
    dogInfoContainer.innerText = ""
    
    const pupImg = document.createElement("img")
    pupImg.src = pup.image
    dogInfoContainer.appendChild(pupImg)

    const pupH2 = document.createElement("h2")
    pupH2.innerText = pup.name
    dogInfoContainer.appendChild(pupH2)

    const dogButton = document.createElement("button")
    dogButton.id = "dog-behaviour"
    if (pup.isGoodDog === false) {
        dogButton.innerText = "Good Dog!"
        dogInfoContainer.appendChild(dogButton)
        dogButton.addEventListener("click", () => updateDogBehaviour(pup))
    } else if ( pup.isGoodDog === true && dogFilter.innerText === "Filter good dogs: ON") {
        dogButton.innerText = "Bad Dog!"
        dogInfoContainer.appendChild(dogButton)
        dogButton.addEventListener("click", () => updateDogBehaviourAndBar(pup, dogButton))
    } else {
        dogButton.innerText = "Bad Dog!"
        dogInfoContainer.appendChild(dogButton)
        dogButton.addEventListener("click", () => updateDogBehaviour(pup))
    }
}

const dogBehaviourButton = document.querySelector("#dog-behaviour")
const updateDogBehaviour = pup => {
    if (pup.isGoodDog === false) {
        pup.isGoodDog = true
        api.patchPup(pup).then(createDogInfoContainer)
    } else {
        pup.isGoodDog = false
        api.patchPup(pup).then(createDogInfoContainer)
    }
}

dogFilter.addEventListener("click", () => {
    if (dogFilter.innerText === "Filter good dogs: OFF") {
        dogFilter.innerText = "Filter good dogs: ON"
        api.getPups().then(filterGoodPups)
    } else {
        dogFilter.innerText = "Filter good dogs: OFF"
        createPups()
    }
})

const filterGoodPups = (pups) => {
    let goodPups = []
    pups.forEach(pup => {
        if (pup.isGoodDog) {
            goodPups.push(pup)
        
        }
    })
    renderDogBar(goodPups)
}

const updateDogBehaviourAndBar = (pup, dogButton) => {
    const dogBar = document.querySelector('#dog-bar')
    
    if (dogButton.innerText === 'Bad Dog!') {
        dogButton.innerText = "Good Dog!"
        dogInfoContainer.appendChild(dogButton)
        const findPup = document.querySelector(`#dog-${pup.id}`)
        dogBar.removeChild(findPup)
        pup.isGoodDog = false
        api.patchPup(pup)
    } else {
        dogButton.innerText = "Bad Dog!"
        dogInfoContainer.appendChild(dogButton)
        const dogSpan = document.createElement("span")
        dogSpan.innerText = pup.name
        dogSpan.id = `dog-${pup.id}`
        dogSpan.addEventListener("click", () => createDogInfoContainer(pup))
        dogBar.appendChild(dogSpan)
        api.isGoodDog = true
        api.patchPup(pup)
    }
}

createPups()