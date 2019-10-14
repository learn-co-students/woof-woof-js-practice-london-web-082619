document.addEventListener('DOMContentLoaded', ()=>{
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const dogFilter = document.getElementById('good-dog-filter');
    dogFilter.addEventListener('click', switchDogFilter);

    makeDogTab();

    function getDogs(){
        return fetch('http://localhost:3000/pups')
            .then(resp => resp.json())
    }

    function makeDogTab(){
        getDogs()
            .then(json => json.forEach(dog => showDogTag(dog)))
    }

    function showDogTag(dog){
        const dogTab = document.createElement('span');
        dogBar.appendChild(dogTab);
        dogTab.innerText = dog.name;
        dogTab.dataset.id = dog.id;
        dogTab.dataset.isGoodDog = dog.isGoodDog;
        dogTab.addEventListener('click', () => showDog(dog))
    }

    function showDog(dog){
        deleteDogInfo();
        const image = document.createElement('img');
        const name = document.createElement('h2');
        const button = document.createElement('button');

        dogInfo.append(image, name, button);

        image.src = dog.image;
        name.innerText = dog.name;
        
        button.innerText = 'Good Dog!';
        if (dog.isGoodDog){button.innerText = 'Bad Dog!'};

        button.addEventListener('click', (e) => changeStatus(e, dog));
    }

    function changeStatus(e, dog){
        e.preventDefault();
        patchDog(dog)
            .then(json => {
                const tab = document.querySelector(`[data-id=\"${dog.id}\"]`);
                tab.dataset.isGoodDog = json.isGoodDog;
                dog.isGoodDog = json.isGoodDog;
                switchStatus(e, dog.isGoodDog);    
            })
    }

    function patchDog(dog){
        const newStatus= !dog.isGoodDog;
        return fetch(`http://localhost:3000/pups/${dog.id}`, configObj(newStatus))
            .then(resp => resp.json())
    }

    function configObj(newStatus){
        return {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: newStatus
            })
        }
    }

    function deleteDogInfo(){
        while (dogInfo.hasChildNodes()){
            dogInfo.removeChild(dogInfo.firstChild);
        }
    }

    function switchStatus(e, status){
        if (status){
            e.target.innerText = 'Bad Dog!';
        } else{
            e.target.innerText = 'Good Dog!';
        }
    }


    function switchDogFilter(){
        if (this.innerText == 'Filter good dogs: ON'){
            this.innerText = 'Filter good dogs: OFF';
            [...dogBar.children].forEach(span => span.className = "")
        }else{
            this.innerText = 'Filter good dogs: ON';
            filterDogs();
        }
    }

    function findBadDogs(){ 
        return [...dogBar.children].filter(dog => dog.dataset.isGoodDog == "false");
    }

    function filterDogs(){
        const array = findBadDogs();

        array.forEach(span => span.className = "hidden")

        console.log("dogs have been filtered");
    }
})