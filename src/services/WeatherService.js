export default class WeatherService {
  _apiBase = 'http://api.openweathermap.org/data/2.5/weather'
  _apiKey = '29b384a4e43360fccad8efd313ff6037'

  async getResource(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  getByCityName(cityName) {
    return this.getResource(`${this._apiBase}?q=${cityName}&appid=${this._apiKey}`)
  }
}
