const DOM = {
  dogBar: document.querySelector("#dog-bar"),
  dogInfoDiv: document.querySelector("#dog-info"),
  filterButton: document.querySelector("#good-dog-filter")
};

let isFiltered = false;

const dogStatusText = {
  goodDog: "Good Dog!",
  badDog: "Bad Dog!"
}

fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(json => renderDogs(json))
  .catch(console.log);

function renderDogs(dogJson) {
  dogJson.forEach(dog => {
    const dogBarItem = createDogBarItem(dog);
    DOM.dogBar.appendChild(dogBarItem);
  });
}

function createDogBarItem(dog) {
  const span = document.createElement("span");
  span.setAttribute("data-dog-id", dog.id)
  if (dog.isGoodDog) {
    span.setAttribute("data-good-dog", "")
  }
  span.textContent = dog.name;
  span.addEventListener("click", getDogInfo)
  return span;
}

function getDogInfo(event) {
  const dogId = event.target.dataset.dogId;
  fetch(`http://localhost:3000/pups/${dogId}`)
    .then(response => response.json())
    .then(json => renderDogInfo(json))
    .catch(console.log);
}

function renderDogInfo(dogJson) {
  const dogElements = createDogElements(dogJson);
  appendDogElementsToPage(dogElements);
}

function createDogElements(dogJson) {
  const dogContainer = document.createElement("div");
  dogContainer.setAttribute("data-dog-id", dogJson.id);
  dogContainer.appendChild(createDogImage(dogJson.image));
  dogContainer.appendChild(createDogHeading(dogJson.name));
  dogContainer.appendChild(createDogButton(dogJson.id, dogJson.isGoodDog));
  return dogContainer;
}

function appendDogElementsToPage(dogElements) {
  while (DOM.dogInfoDiv.hasChildNodes()) {
    DOM.dogInfoDiv.lastChild.remove();
  }
  DOM.dogInfoDiv.appendChild(dogElements);
}

function createDogImage(dogImageUrl) {
  const img = document.createElement("img")
  img.src = dogImageUrl;
  return img;
}

function createDogHeading(dogName) {
  const h2 = document.createElement("h2");
  h2.textContent = dogName;
  return h2;
}

function createDogButton(dogId, isGoodDog) {
  const button = document.createElement("button");
  button.setAttribute("data-dog-id", dogId);
  renderDogStatus(button, isGoodDog);
  button.addEventListener("click", toggleGoodDog);
  return button;
}

function toggleGoodDog(event) {
  const button = event.target;
  const dogId = button.dataset.dogId;
  const newDogStatus = !button.hasAttribute("data-good-dog");

  fetch(`http://localhost:3000/pups/${dogId}`, createUpdateDogConfig(newDogStatus))
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP status code " + response.status);
      }
      renderDogStatus(button, newDogStatus);
    })
    .catch(console.log);
}

function createUpdateDogConfig(newDogStatus) {
  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ isGoodDog: newDogStatus })
  }
  return config;
}

function renderDogStatus(button, isGoodDog) {
  const dogSpan = document.querySelector(`span[data-dog-id="${button.dataset.dogId}"`);
  if (isGoodDog) {
    dogSpan.setAttribute("data-good-dog", "");
    button.setAttribute("data-good-dog", "");
    button.textContent = dogStatusText.goodDog;
  } else {
    button.removeAttribute("data-good-dog", "");
    button.removeAttribute("data-good-dog", "");
    button.textContent = dogStatusText.badDog;
  }
}

DOM.filterButton.addEventListener("click", toggleFilter);

function toggleFilter(event) {
  const button = event.target;
  const dogs = [...DOM.dogBar.children];
  if (isFiltered) {
    clearFilter(button, dogs);
  } else {
    applyFilter(button, dogs);
  }
  isFiltered = !isFiltered;
}

function clearFilter(button, dogs) {
  dogs.forEach(dog => {
    dog.style.display = "flex";
  });
  button.textContent = "Filter good dogs: OFF";
}

function applyFilter(button, dogs) {
  const badDogs = dogs.filter(dog => {
    return !dog.hasAttribute("data-good-dog");
  });
  badDogs.forEach(dog => {
    dog.style.display = "none";
  });
  button.textContent = "Filter good dogs: ON";
}