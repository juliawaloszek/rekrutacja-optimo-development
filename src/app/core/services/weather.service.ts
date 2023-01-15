import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiKey } from '../../api-key';
import { SelectedCities, SELECTED_CITIES } from '../models/selected-cities';
import { Weather } from '../models/basic-weather';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly basicApi = 'http://api.openweathermap.org/data/2.5/weather';
  private readonly initialCities: SelectedCities[] = SELECTED_CITIES;


  constructor(
    private readonly http: HttpClient
  ) { }

  getBasicWeather(id: number): Observable<Weather> {
    const params = new HttpParams()
      .set('id', id)
      .set('units', 'metric')
      .set('APPID', 'b186adad1b1dc5429263aa6a895ef54b');

    return this.http.get<Weather>(this.basicApi, { params }).pipe(
      map((response: any) => {
        const basicWeather: Weather = {
          cityID: response.id,
          city: response.name,
          temp: response.main.temp,
          weather: response.weather,
        }
        return basicWeather;
      })
    );
  }

  getRandomCity(): number {
    return this.initialCities[Math.floor(Math.random() * this.initialCities.length)].id;
  }

}
