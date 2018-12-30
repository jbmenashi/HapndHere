class App {
  attachEventListeners() {
    document.querySelector('#locations-list').addEventListener('click', (event) => {
      const id = parseInt(event.target.dataset.id)
      const location = Location.findById(id)
      document.querySelector('#update').innerHTML = location.renderUpdateForm()
    })

    document.querySelector('#update').addEventListener('submit', (event) => {
     event.preventDefault()
     const id = parseInt(event.target.dataset.id)
     const location = Location.findById(id)
     const city = event.target.querySelector('#city-input').value
     const state = event.target.querySelector('#state-input').value
     const latitude = event.target.querySelector('#latitude-input').value
     const longitude = event.target.querySelector('#longitude-input').value

     fetch(`http://localhost:3000/api/v1/locations/${location.id}`, {
       method: 'PATCH',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
       },
       body: JSON.stringify({
         city: city,
         state: state,
         latitude: latitude,
         longitude: longitude
       }),
     })
       .then(res => res.json())
       .then(updatedLocation => console.log(updatedLocation));
   })
  }
}
