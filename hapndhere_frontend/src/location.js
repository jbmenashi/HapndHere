class Location {
  constructor(data) {
    this.id = data.id;
    this.city = data.city;
    this.state = data.state;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    Location.all.push(this);
  }

  renderListItem() {
    return `
    <li>
      <h3>${this.city}
        <button data-id=${this.id}>edit</button>
      </h3>
    </li>`;
  }

  static findById(id) {
    return this.all.find(location => location.id === id);
  }

  renderUpdateForm() {
    return `
    <form data-id=${this.id}>
      <label for="city">City</label>
      <input id="city-input" name="city" type="text" value="${this.city}" />
      <label for="state">State</label>
      <input id="state-input" name="state" type="text" value="${this.state}" />
      <label for="latitude">Latitude</label>
      <input id="latitude-input" name="latitude" type="text" value="${this.latitude}" />
      <label for="longitude">Longitude</label>
      <input id="longitude-input" name="longitude" type="text" value="${this.longitude}" />
      <button type='submit'>Update Location</button>
    </form>`
  }

}

Location.all = [];
