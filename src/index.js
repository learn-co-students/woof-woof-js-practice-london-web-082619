window.addEventListener("DOMContentLoaded", () => init());

const dogBar = document.querySelector("#dog-bar")

const init = () => {
  const filterButton = document.querySelector("#good-dog-filter");
  filterButton.addEventListener("click", toggleFilter);
  loadDogs();
}

const loadDogs = () => {
  adapter.getDogs()
  .then(renderDogsBar)
  .catch(console.error);
}

const renderDogsBar = dogs => {
  clearElement(dogBar);
  dogs.forEach(renderDogSpan);
}

const renderDogSpan = dog => {
  const span = document.createElement("span");
  span.textContent = dog.name;
  span.addEventListener("click", () => showDog(dog))
  dogBar.append(span);
}

const showDog = dog => {
  const dogInfo = document.querySelector("#dog-info");
  clearElement(dogInfo);
  dogInfo.append(
    createDogImg(dog.image),
    createDogHeading(dog.name),
    createDogButton(dog)
  );
}

const clearElement = element => {
  while (element.hasChildNodes()) {
    element.lastChild.remove();
  }
}

const createDogImg = imageURL => {
  const img = document.createElement("img");
  img.src = imageURL;
  return img;
} 

const createDogHeading = dogName => {
  const h2 = document.createElement("h2");
  h2.textContent = dogName;
  return h2;
}

const createDogButton = dog => {
  const button = document.createElement("button");
  if (dog.isGoodDog) {
    button.textContent = "Good Dog!";
  } else {
    button.textContent = "Bad Dog!";
  }
  button.addEventListener("click", () => toggleDogStatus(dog));
  return button;
}

const toggleDogStatus = dog => {
  dog.isGoodDog = !dog.isGoodDog;
  adapter.patchDog(dog)
    .then(rerenderButton)
    .catch(console.error);
}

const rerenderButton = dog => {
  const oldButton = document.querySelector("#dog-info button")
  const newButton = createDogButton(dog);
  oldButton.parentNode.replaceChild(newButton, oldButton);
}

const toggleFilter = event => {
  const filterButton = event.target;
  if (filterButton.textContent.includes("OFF")) {
    filterButton.textContent = "Filter good dogs: ON"
    loadGoodDogs();
  } else {
    filterButton.textContent = "Filter good dogs: OFF"
    loadDogs();
  }
}

const loadGoodDogs = () => {
  adapter.getGoodDogs()
    .then(renderDogsBar)
    .catch(console.error);
}