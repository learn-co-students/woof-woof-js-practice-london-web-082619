document.addEventListener("DOMContentLoaded", function(){
    getDoggos();
})

function getDoggos(){
    return fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(doggos => renderDoggos(doggos))
}

function renderDoggos(doggos){
    doggos.forEach(function(doggo){
        renderDoggo(doggo)
    })  
}

function renderDoggo(doggo){
    const dogBar = document.getElementById('dog-bar')
    let span = document.createElement('span')
    span.innerText = doggo.name
    span.addEventListener('click', function(){
        moreDogInfo(doggo)
    })
    dogBar.append(span)
}

function moreDogInfo(doggo){
    
    const dogInfo = document.getElementById('dog-info')
    while(dogInfo.hasChildNodes()){
        dogInfo.removeChild(dogInfo.lastChild);
    }

    let img = document.createElement('img')
        img.src = doggo.image
    let h2 = document.createElement('h2')
        h2.innerText = doggo.name
    const button = document.createElement('button')
        button.id = 'doggo-button'
        if (doggo.isGoodDog === true) {
            button.innerText = 'Good Dog!'
        } else {
            button.innerText = 'Bad Dog!'
        }
        button.addEventListener('click', function(){
            changeButton(doggo)
        })
    dogInfo.append(img, h2, button)
}

function changeButton(doggo){
    const button = document.getElementById('doggo-button')
    if (button.innerText === 'Good Dog!') {
        doggo.isGoodDog = false
        fetch("http://localhost:3000/pups/"+doggo.id, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(doggo)
        }).then(resp => resp.json())
        button.innerText = 'Bad Dog!'
    } else {
        doggo.isGoodDog = true
        fetch("http://localhost:3000/pups/"+doggo.id, {
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(doggo)
        }).then(resp => resp.json())
        button.innerText = 'Good Dog!'
    }
}



