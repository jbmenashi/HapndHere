class App {
  attachEventListeners() {

    document.addEventListener('submit', (event) => {
      event.preventDefault()
      if (event.target.id === "date-submit") {
        let foundWhen = When.all.find(when => when.date.includes(`${document.querySelector('#start').value}`))
        if (foundWhen !== undefined) {
          fetch(`http://localhost:3000/api/v1/whens/${foundWhen.id}/locations`)
          .then(response => response.json())
          .then(data => {
            document.querySelector('#list-of-locations').innerHTML = ''
            document.querySelector('#list-of-events').innerHTML = ''
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
      else if (event.target.id === "add-event-form") {
        let foundLocation = Location.all.find(location => location.latitude == `${document.querySelector('#lat-input').value}`)
        if (foundLocation !== undefined) {
          fetch(`http://localhost:3000/api/v1/locations/${foundLocation.id}/events`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body: JSON.stringify({
              title: document.querySelector('#event-title-input').value,
              info: document.querySelector('#event-info-input').value,
              img_url: document.querySelector('#img-url-input').value
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            Event.all.push(data)
            event.target.reset()
          })
        }
        else {

        }
      }
    })

    document.addEventListener('click', (event) => {
      if (event.target.parentNode.id === "list-of-locations") {
        let foundLocation = Location.all.find(location => location.id == event.target.dataset.id)
        document.querySelector('#city-input').value = foundLocation.city
        document.querySelector('#state-input').value = foundLocation.state
        document.querySelector('#lat-input').value = foundLocation.latitude
        document.querySelector('#long-input').value = foundLocation.longitude
        fetch(`http://localhost:3000/api/v1/locations/${foundLocation.id}/events`)
        .then(response => response.json())
        .then(data => {
          document.querySelector('#list-of-events').innerHTML = ''
          data.forEach(e => {
            document.querySelector('#list-of-events').innerHTML += `
                                                                    <li data-id="${e.id}">${e.title}</li>`
          })
        })
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
