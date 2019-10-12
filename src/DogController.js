class DogController {

  static init() {
    DogController.addDogsToDogBar();
    const filterButton = document.querySelector("#good-dog-filter");
    filterButton.dataset.filter = false;
    filterButton.addEventListener("click", DogController.filterDogs)
  }

  static addDogsToDogBar() {
    const dogBar = document.querySelector("#dog-bar");
    const filterButton = document.querySelector("#good-dog-filter");
    const isFiltered = (filterButton.dataset.filter === "true");

    DogController.clearElement(dogBar);
    Adapter.getDogs()
      .then(dogRecords => {
        dogRecords.forEach(dogRecord => {
          if (!isFiltered || dogRecord.isGoodDog) {
            const dog = new Dog(dogRecord);
            dogBar.append(dog.spanEl());
          }
        });
      });   
  }

  static clearElement(element) {
    while (element.hasChildNodes()) {
      element.lastChild.remove();
    }
  }

  static showDog(dog) {
    const dogInfo = document.querySelector("#dog-info");
    DogController.clearElement(dogInfo);
    dogInfo.append(dog.imageEl(), dog.headingEl(), dog.buttonEl());
  }

  static toggleGoodDog(dog, event) {
    if (dog.isGoodDog) {
      event.target.textContent = "Bad Dog!";
    } else {
      event.target.textContent = "Good Dog!";
    }
    dog.isGoodDog = !dog.isGoodDog;
    Adapter.updateDog(dog)
      .then(DogController.addDogsToDogBar);
  }

  static filterDogs(event) {
    const filterButton = event.target;
    if (filterButton.dataset.filter === "true") {
      filterButton.textContent = "Filter good dogs: OFF";
      filterButton.dataset.filter = "false";
    } else {
      filterButton.textContent = "Filter good dogs: ON";
      filterButton.dataset.filter = "true";
    }
    DogController.addDogsToDogBar();
  }

}