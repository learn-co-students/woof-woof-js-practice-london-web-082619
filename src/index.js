BASE_URL = `http://localhost:3000`
PUPS_URL = `${BASE_URL}/pups`

const getDogs = () => {
    return fetch(PUPS_URL).then(response => response.json())
}

const patchDog = (dog) => {
    return fetch(`${PUPS_URL}/${dog.id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(
            {"isGoodDog": !dog.isGoodDog}
        )
    }).then(response => response.json())
      .then(reloadPage(dog))
}

const displayAllDogs = () => {
    getDogs().then(arrayOfDogsData => renderDogs(arrayOfDogsData))
}

const filterGoodDogs = () => {
    getDogs().then(arrayOfDogsData => renderDogs(filterDogs(arrayOfDogsData)))
}

const filterDogs = (arrayOfDogsData) => {
    filteredDogsArray = []
    arrayOfDogsData.forEach(dog => {
        if (dog.isGoodDog){
            filteredDogsArray.push(dog);
        } else {
            return;
        }
    })
    return filteredDogsArray;
}

const renderDogs = (arrayOfDogsData) => {
    arrayOfDogsData.forEach(dog => {
        renderDogButton(dog);
    })
}

const renderDogButton = (dog) => {
    let dog_bar = document.getElementById("dog-bar");
    let dog_button = document.createElement("span");
    dog_button.innerText = `${dog.name}`;
    dog_button.addEventListener("click", () => displayDog(dog));
    dog_bar.appendChild(dog_button)
}

const displayDog = (dog) => {
    let dogInfo = document.getElementById("dog-info");

    while(dogInfo.hasChildNodes() ){
        dogInfo.removeChild(dogInfo.lastChild);
    }

    let header = createHeaderElement(dog, dogInfo);
    let image = createImageElement(dog, dogInfo);
    let name = createNameElement(dog, dogInfo);
    let button = createGoodBadButton(dog, dogInfo);
}

const createHeaderElement = (dog, dogInfo) => {
    let header = document.createElement("h2");
    header.textContent = "DOGGO";
    dogInfo.appendChild(header);
}

const createImageElement = (dog, dogInfo) => {
    let image = document.createElement("img");
    image.setAttribute("src", `${dog.image}`);
    dogInfo.appendChild(image);
}

const createNameElement = (dog, dogInfo) => {
    let name = document.createElement("p");
    name.innerText = `${dog.name}`;
    dogInfo.appendChild(name);
}

const createGoodBadButton = (dog, dogInfo) => {
    let goodBadButton = document.createElement("button");
    goodBadButton.innerText = createGoodBadButtonText(dog);
    goodBadButton.addEventListener('click', () => patchDog(dog))
    dogInfo.appendChild(goodBadButton);
}

const createGoodBadButtonText = (dog) => {
    if (dog.isGoodDog) {
        return `Good Dog!`;
    } else if (!dog.isGoodDog) {
        return `Bad Dog!`;
    }
}

const addGoodDogFilter = () => {
    let goodDogFilter = document.getElementsByClassName("good-dog-filter")[0]
    goodDogFilter.setAttribute("id", "off")
    goodDogFilter.addEventListener("click", handleDogFiltering)
}

const handleDogFiltering = () => {
    goodDogFilter = document.getElementsByClassName("good-dog-filter")[0];
    let dogClass = goodDogFilter.id

    if (dogClass == "off") {
        changeDogFilterState("off")
        clearDogs();
        filterGoodDogs();
    } else {
        changeDogFilterState("on")
        clearDogs();
        displayAllDogs();
    }
}

const changeDogFilterState = (state) => {
    if (state == "off") {
        goodDogFilter.setAttribute("id", "on")
        goodDogFilter.innerText = "Filter good dogs: ON"
    } else if (state == "on") {
        goodDogFilter.setAttribute("id", "off")
        goodDogFilter.innerText = "Filter good dogs: OFF"
    }
}

const clearDogs = () => {
    let dogs = document.getElementById("dog-bar")
    while(dogs.hasChildNodes() ){
        dogs.removeChild(dogs.lastChild);
    }
}

const reloadPage = (dog) => {
    changeGoodBadButton(dog)
    reloadDogBar();
}

const changeGoodBadButton = (dog) => {
    let button = document.getElementsByTagName("button")[1]
    dog.isGoodDog = !dog.isGoodDog
    button.innerText = createGoodBadButtonText(dog)
} 

const reloadDogBar = () => {
    let filterButton = document.getElementsByClassName("good-dog-filter")[0];
    clearDogs();
    if (filterButton.id == "on") {
        filterGoodDogs();
    } else {
        displayAllDogs();
    }
}

displayAllDogs();
addGoodDogFilter();