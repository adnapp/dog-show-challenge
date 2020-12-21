tableBody = document.querySelector('#table-body')
editDogForm = document.querySelector('#dog-form')
// debugger
//render all dogs
fetch(`http://localhost:3000/dogs`)
.then(resp => resp.json())
.then(data => renderAllDogs(data))

function renderAllDogs(dog) {
    dog.forEach(dog => renderOneDog(dog))
}

function renderOneDog(dog){
    newTableRow = document.createElement('tr')
    newTableRow.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class="edit-button" data-id=${dog.id}>Edit</button></td>
    `
    tableBody.appendChild(newTableRow)
}

// edit dog
tableBody.addEventListener('click', event => {
    //populate top form with dog data
    if (event.target.matches('.edit-button')) {
        // debugger
        id = event.target.dataset.id;
        fetch(`http://localhost:3000/dogs/${id}`)
        .then(resp => resp.json())
        .then(data => populateForm(data))
    }       
})

function populateForm(dogData){
    document.querySelector('form input[name=name]').value = dogData.name
    document.querySelector('form input[name=breed]').value = dogData.breed
    document.querySelector('form input[name=sex]').value = dogData.sex
    document.querySelector('form [type=submit]').dataset['id'] = dogData.id
}

//add patch request here


editDogForm.addEventListener('submit',  event => {
    //make new obj with edited data, patch it through
    event.preventDefault();

    dogName = document.querySelector('form input[name=name]').value
    dogBreed = document.querySelector('form input[name=breed]').value 
    dogSex = document.querySelector('form input[name=sex]').value 
    dogId = document.querySelector('form [type=submit]').dataset['id']


    editDogObj = {
        name: dogName,
        breed: dogBreed,
        sex: dogSex
    }
    // debugger
    
    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editDogObj)
    })
    // debugger

    fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(data => renderAllDogs(data))
    
// we want to rerender here
    event.target.reset()
})


