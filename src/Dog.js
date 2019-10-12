class Dog {

  constructor(dogRecord) {
    this.id = dogRecord.id;
    this.name = dogRecord.name;
    this.isGoodDog = dogRecord.isGoodDog;
    this.image = dogRecord.image;
  }

  spanEl() {
    const span = document.createElement("span");
    span.textContent = this.name;
    span.addEventListener("click", () => DogController.showDog(this));
    return span;
  }

  imageEl() {
    const img = document.createElement("img");
    img.src = this.image;
    return img;
  }

  headingEl() {
    const heading = document.createElement("h2");
    heading.textContent = this.name;
    return heading;
  }

  buttonEl() {
    const button = document.createElement("button");
    button.textContent = this.isGoodDog ? "Good Dog!" : "Bad Dog!";
    button.addEventListener("click", event => DogController.toggleGoodDog(this, event));
    return button;
  }
  
}