const baseURL = "http://localhost:3000/pups"

const getDogs = () => {
  return fetch(baseURL)
    .then(objectify);
}

const getGoodDogs = () => {
  return fetch(`${baseURL}?isGoodDog=true`)
    .then(objectify);
}

const patchDog = dog => {
  const config = generateConfig(dog.isGoodDog);
  return fetch(`${baseURL}/${dog.id}`, config)
    .then(objectify);
}

const generateConfig = dogGoodness => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept":  "application/json"
    },
    body: JSON.stringify({ isGoodDog: dogGoodness })
  }
}

const objectify = response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("HTTP status code " + response.status)
  }
}

const adapter = {
  getDogs: getDogs,
  getGoodDogs: getGoodDogs,
  patchDog: patchDog
}