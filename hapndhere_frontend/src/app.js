class App {
  attachEventListeners() {

    let foundLocation
    let foundWhen

    let mymap = L.map('map-area').setView([39, -96], 4);
    let markersLayerGroup = L.layerGroup()

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiamJtZW5hc2hpIiwiYSI6ImNqcWZyYXFvZTU1ejg0MmxnNXQxaHZwYTMifQ.Uvhck3cxhndzZdytkylSPw'
  }).addTo(mymap);

    const fetchEventsByLocation = (when, location) => {
      fetch(`http://localhost:3000/api/v1/whens/${when.id}/locations/${location.id}/events`)
      .then(response => response.json())
      .then(data => {
        document.querySelector('#list-of-events').innerHTML = ''
        data.forEach(e => {
          document.querySelector('#list-of-events').innerHTML += `
                                                                  <li data-id="${e.id}">${e.title}</li>`
        })
      })
    }



    document.addEventListener('submit', (event) => {
      event.preventDefault()
      if (event.target.id === "date-submit") {
        foundWhen = When.all.find(when => when.date.includes(`${document.querySelector('#start').value}`))
        if (foundWhen !== undefined) {
          fetch(`http://localhost:3000/api/v1/whens/${foundWhen.id}/locations`)
          .then(response => response.json())
          .then(data => {
            mymap.on('click', e => {
              document.querySelector('#add-event-form').reset()
              let infoPopup = L.popup()
              infoPopup.setLatLng(e.latlng).setContent("Add An Event To This Location Below!").openOn(mymap)
              document.querySelector('#lat-input').value = e.latlng.lat
              document.querySelector('#long-input').value = e.latlng.lng
            });
            markersLayerGroup.clearLayers()
            document.querySelector('#add-event-form').reset()
            document.querySelector('#list-of-events').innerHTML = ''
            document.querySelector('.event-info').innerHTML = `<h3>Event Info:</h3>`
            data.forEach(location => {
              let marker = L.marker([location.latitude, location.longitude]);
              markersLayerGroup.addLayer(marker).addTo(mymap)
              marker.on('click', e => {
                marker.bindPopup(`${location.city}, ${location.state}`).openPopup();
                document.querySelector('#city-input').value = location.city
                document.querySelector('#state-input').value = location.state
                document.querySelector('#lat-input').value = location.latitude
                document.querySelector('#long-input').value = location.longitude
                fetchEventsByLocation(foundWhen, location)
              })
            })
          })
        }
        else {
          let year = document.querySelector('#start').value.split("-")[0]
          let month = document.querySelector('#start').value.split("-")[1] - 1
          let day = document.querySelector('#start').value.split("-")[2]
          fetch(`http://localhost:3000/api/v1/whens`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body: JSON.stringify({
              date: new Date(year, month, day)
            })
          })
          .then(response => response.json())
          .then(data => {
            When.all.push(data)
          })
        }
      }
    })

    document.addEventListener('submit', (event) => {
      if (event.target.id === "add-event-form") {
        foundWhen = When.all.find(when => when.date.includes(`${document.querySelector('#start').value}`))
        foundLocation = Location.all.find(location => location.latitude == `${document.querySelector('#lat-input').value}`)
        if (foundLocation !== undefined) {
          fetch(`http://localhost:3000/api/v1/events`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body: JSON.stringify({
              when_id: foundWhen.id,
              location_id: foundLocation.id,
              title: document.querySelector('#event-title-input').value,
              info: document.querySelector('#event-info-input').value,
              img_url: document.querySelector('#img-url-input').value
            })
          })
          .then(response => response.json())
          .then(data => {
            Event.all.push(data)
            fetchEventsByLocation(foundWhen, foundLocation)
            event.target.reset()
          })
        }
        else {
          fetch(`http://localhost:3000/api/v1/locations`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body: JSON.stringify({
              city: document.querySelector('#city-input').value,
              state: document.querySelector('#state-input').value,
              latitude: document.querySelector('#lat-input').value,
              longitude: document.querySelector('#long-input').value
            })
          })
          .then(response => response.json())
          .then(data => {
            Location.all.push(data)
            let newMarker = L.marker([data.latitude, data.longitude])
            markersLayerGroup.addLayer(newMarker)
            newMarker.on('click', e => {
              newMarker.bindPopup(`${data.city}, ${data.state}`).openPopup();
              document.querySelector('#city-input').value = data.city
              document.querySelector('#state-input').value = data.state
              document.querySelector('#lat-input').value = data.latitude
              document.querySelector('#long-input').value = data.longitude
              fetchEventsByLocation(foundWhen, data)
            })
            fetch(`http://localhost:3000/api/v1/events`, {
              method: 'POST',
              headers: {
                'Content-Type':'application/json',
                'Accept':'application/json'
              },
              body: JSON.stringify({
                when_id: foundWhen.id,
                location_id: data.id,
                title: document.querySelector('#event-title-input').value,
                info: document.querySelector('#event-info-input').value,
                img_url: document.querySelector('#img-url-input').value
              })
            })
            .then(response => response.json())
            .then(event_data => {
              Event.all.push(event_data)
              event.target.reset()
            })
          })
        }
      }
    })

    document.addEventListener('click', (event) => {
      if (event.target.parentNode.id === "list-of-events") {
        let foundEvent = Event.all.find(e => e.id == event.target.dataset.id)
        document.querySelector('.event-info').innerHTML = `<div id="event-info-deets"><h3>${foundEvent.title}</h3>
                                                            <h4>${foundEvent.info}</h4></div>
                                                            <div id="event-info-image"><img src="${foundEvent.img_url}" width="200px" height="200px">
                                                            </div>
                                                            <div id="buttons" data-id="${event.target.dataset.id}">
                                                              <button id="edit-event" class="btn btn-warning btn-sm">Edit</button>
                                                              <button id="delete-event" class="btn btn-danger btn-sm">Delete</button>
                                                            </div>`
      }
      else if (event.target.id === "edit-event") {
        let foundEvent = Event.all.find(e => e.id == event.target.parentNode.dataset.id);
        
      }
      else if (event.target.id === "delete-event") {
        let foundEvent = Event.all.find(e => e.id == event.target.parentNode.dataset.id);
      }
    })


  }
}
