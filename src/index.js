window.addEventListener('DOMContentLoaded', () => {

    const goodDogFilter = document.getElementById('good-dog-filter')
    const dogBar = document.getElementById('dog-bar')
    const dogInfo = document.getElementById('dog-info')
    const dogsUrl = 'http://localhost:3000/pups'
    goodDogFilter.addEventListener('click', toggleFilter)

    function toggleFilter(e) {
        const doggos = document.getElementsByTagName('span')
        if (e.target.innerText === "Filter good dogs: OFF") {
            e.target.innerText = "Filter good dogs: ON"
            for (let i = 0; i < doggos.length; i++) {
                if (doggos[i].dataset.goodDog === "false") {
                    doggos[i].style = "display: none"
                }
            }
        } else {
            e.target.innerText = "Filter good dogs: OFF"
            for (let i = 0; i < doggos.length; i++) {
                    doggos[i].style = ""
            }
        }
    }

    function getDogs() {
        fetch(dogsUrl, {
            headers: {
                "Accept": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(json => listDogs(json))
    }

    function listDogs(dogs) {
        while (dogBar.hasChildNodes()) {
        dogBar.removeChild(dogBar.firstChild);
      }
        dogs.forEach(dog => createDog(dog))
    }

    function createDog(dog) {
        const span = document.createElement('span')
        span.innerText = dog.name
        dogBar.appendChild(span)
        span.addEventListener('click', showPupperDetails)
        span.dataset.id = dog.id
        span.dataset.image = dog.image
        span.dataset.goodDog = dog.isGoodDog
        if (goodDogFilter.innerText === "Filter good dogs: ON" && dog.isGoodDog === "false") {
            span.style = "display: none"
                }
    }

    function showPupperDetails(e) {
        while (dogInfo.hasChildNodes()){
            dogInfo.removeChild(dogInfo.firstChild);
        }
        const dogName = e.target.innerText
        const dogStatus = e.target.dataset.goodDog
        const name = document.createElement('h2').innerText = dogName
        const image = document.createElement('img')
        const goodDogButton = document.createElement('button')
        image.src = e.target.dataset.image
        dogButton(goodDogButton, dogStatus, dogName)
        goodDogButton.dataset.id = e.target.dataset.id
        dogInfo.append(image, name, goodDogButton)
        // dogInfo.append(name)
        // dogInfo.append(goodDogButton)
    }

        function dogButton(goodDogButton, dogStatus, dogName) {
            if (dogStatus === "true") {
                goodDogButton.innerText = 'Good Dog'
                goodDogButton.className = 'good'
                goodDogButton.dataset.good = false
            }
            else {
                goodDogButton.innerText = 'Misbehaving'
                goodDogButton.className = 'naughty' 
                goodDogButton.dataset.good = true
            }
            goodDogButton.addEventListener('click', toggleGoodDog)
        }

        function toggleGoodDog(e) {
            const dogStatus = e.target.dataset.good
            const configObj = createUpdateDogConfig(dogStatus)
            const id = e.target.dataset.id
            fetch(`${dogsUrl}/${id}`, configObj)
            .then(resp => resp.json())
            .then(getDogs)
            if (e.target.innerText === "Misbehaving") {
                e.target.innerText = "Good Dog"
                e.target.className = "good"
                e.target.dataset.good = false
            } else {
                e.target.innerText = "Misbehaving"
                e.target.className = "naughty"
                e.target.dataset.good = true 
            }            
        }

        function createUpdateDogConfig(dogStatus) {
            const config = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: dogStatus
                })
            }
            return config
        }


    getDogs()


})