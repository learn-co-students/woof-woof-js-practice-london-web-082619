
const dogBar = document.querySelector('#dog-bar');
const DivDoginfo = document.querySelector('#dog-info');
const filterDiv = document.querySelector('#filter-div')

API.getDogs().then(dogs => renderDogs(dogs))

const renderDogs=(dogs)=>{
    dogs.forEach(dog => renderDog(dog))
}

const renderDog = (dog)=>{
    let span = document.createElement('span');
    span.innerText = `${dog.name}`
    // span.innerText = dog.name
    dogBar.append(span)
    span.addEventListener('click', e =>{
        dogInfo(dog)
    })
}
const dogInfo = (dog)=>{
    DivDoginfo.innerHTML = ""
    const img = document.createElement('img')
    img.src = `${dog.image}`
    const h2 = document.createElement('h2')
    h2.innerText = `${dog.name}`;
    const btn = document.createElement('button')
    btn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
    btn.addEventListener('click', e=>{
        updateDogState(dog)
    })

    DivDoginfo.append(img, h2, btn)
}
const updateDogState = (dog)=>{
    dog.isGoodDog = !dog.isGoodDog
    API.patch(dog).then(dogInfo(dog))
}

const renderGoodDogs= (dogs)=>{
    // if filter is on render good dogs 
    if (filterDiv.innerText === "Filter good dogs: OFF"){
        dogBar.innerHTML = ""
        filterDiv.innerText = "Filter good dogs: ON"

        dogs.forEach(dog =>{
            if (dog.isGoodDog){
                renderDog(dog)
            } 
        })
    }else{
        filterDiv.innerText = "Filter good dogs: OFF"
        dogBar.innerHTML = ""
        renderDogs(dogs)
    }
}
filterDiv.addEventListener('click', e=>{
    API.getDogs().then(dogs => renderGoodDogs(dogs))
})
