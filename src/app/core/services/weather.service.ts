import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiKey } from '../../api-key';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=' + ApiKey.apiKey;

  constructor(private http: HttpClient) { }

  getWeather() {
    return this.http.get(this.apiUrl);
  }

}
