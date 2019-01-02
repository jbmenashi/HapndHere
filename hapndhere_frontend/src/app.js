class App {
  attachEventListeners() {

    let foundLocation
    let foundWhen

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
            document.querySelector('#list-of-locations').innerHTML = ''
            document.querySelector('#list-of-events').innerHTML = ''
            document.querySelector('.event-info').innerHTML = `<h3>Event Info:</h3>`
            document.querySelector('#city-input').value = ''
            document.querySelector('#state-input').value = ''
            document.querySelector('#lat-input').value = ''
            document.querySelector('#long-input').value = ''
            data.forEach(location => {
              document.querySelector('#list-of-locations').innerHTML += `
                                                                <li data-id="${location.id}">${location.city}</li>
                                                                `
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
            document.querySelector('#list-of-locations').innerHTML = ''
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
      if (event.target.parentNode.id === "list-of-locations") {
        foundWhen = When.all.find(when => when.date.includes(`${document.querySelector('#start').value}`))
        foundLocation = Location.all.find(location => location.id == event.target.dataset.id)
        document.querySelector('#city-input').value = foundLocation.city
        document.querySelector('#state-input').value = foundLocation.state
        document.querySelector('#lat-input').value = foundLocation.latitude
        document.querySelector('#long-input').value = foundLocation.longitude
        fetchEventsByLocation(foundWhen, foundLocation)
      }
      else if (event.target.parentNode.id === "list-of-events") {
        let foundEvent = Event.all.find(e => e.id == event.target.dataset.id)
        document.querySelector('.event-info').innerHTML = `<div id="event-info-deets"><h3>${foundEvent.title}</h3>
                                                            <h4>${foundEvent.info}</h4></div>
                                                            <div id="event-info-image"><img src="${foundEvent.img_url}" width="200px" height="200px">
                                                            </div>`
      }
    })


  }
}
