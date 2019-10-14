
const GOOD_DOG_FILTER_BUTTON = document.getElementById('good-dog-filter');
const DOG_BAR_CONTAINER = document.getElementById('dog-bar');
const DOG_INFO_CONTAINER = document.getElementById('dog-info');

// Make a fetch to get all of the pup objects. 
document.addEventListener('DOMContentLoaded', () => {
    API.getDogs().then(dogs => renderDogBar(dogs))
})

// For each pup name, create a span and append it to the dog bar.
function renderDogBar(dogs){
    dogs.forEach(dog => renderDogSpan(dog))
}

function renderDogSpan(dog){
    let dogSpan = document.createElement('span');
    dogSpan.innerText = dog.name;
    dogSpan.id = `pup-${dog.id}`
    dogSpan.addEventListener('click', () => {
        callgetDogDetailsAPI(dog.id)});
    DOG_BAR_CONTAINER.appendChild(dogSpan)
}

function callgetDogDetailsAPI(dogID){
    API.getDogDetails(dogID).then(dog => renderDog(dog))
}

// When a pup span is clicked, show image, name, and isGoodDog status in dog-info container
    // img with pup's image url
    // h2 with pup name
    // button with innerText "Good Dog!"
function renderDog(dog){
    DOG_INFO_CONTAINER.innerText = "";
   let dogImage = document.createElement('img');
   dogImage.src = dog.image; 

   let dogName = document.createElement('h2');
   dogName.innerText = dog.name;

   let goodBoyButton = document.createElement('button');
   goodBoyButton.addEventListener('click', () => {
        toggleGoodDog(dog, goodBoyButton)})
    setButtonStatus(dog, goodBoyButton)

   DOG_INFO_CONTAINER.append(dogImage, dogName, goodBoyButton)
}

function toggleGoodDog(dog, goodBoyButton){
    let dogData = {
        isGoodDog: !dog.isGoodDog
    }
    let configObject = API.createConfigObject(dogData, "PATCH");
    API.patchDog(dog.id, configObject).then(dog => setButtonStatus(dog, goodBoyButton))
}

function setButtonStatus(dog, button){

    if (dog.isGoodDog == true) {
        button.innerText = "Good Dog!";
    } else {
        button.innerText = "Bad Dog!";
    };     
}


//When Good Dog is clicked...
    // Button text changes from Good Dog to Bad Dog
    // Pup object is updated to reflect new isGoofDog value

// Filter doog dogs
    //when clicked, only good dogs are shown on dog bar