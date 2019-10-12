class Adapter {
  static getDogs() {
    return fetch("http://localhost:3000/pups")
      .then(response => response.json())
      .catch(console.log);
  }

  static updateDog(dog) {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ isGoodDog: dog.isGoodDog })
    }
    return fetch(`http://localhost:3000/pups/${dog.id}`, config)
      .then(response => response.json())
      .catch(console.log);
  }
}