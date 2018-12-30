document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM Content is Loaded boiiii")

  const app = new App();
  app.attachEventListeners();

  const locationsURL = 'http://localhost:3000/api/v1/locations'
  const locationsList = document.querySelector('#locations-list')
  let allLocations = []

  const fetchLocations = () => {
    fetch(locationsURL)
    .then(response => response.json())
    .then(data => {
      allLocations = data
      showAllLocations(data)
    })
  }

  const showAllLocations = (allLocations) => {
    allLocations.forEach(location => {
      const newLocation = new Location(location)
      locationsList.innerHTML += newLocation.renderListItem()
    })
  }


  fetchLocations()

});
