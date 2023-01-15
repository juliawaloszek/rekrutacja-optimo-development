import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { Weather } from './core/models/basic-weather';
import { WeatherService } from './core/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly selectedCities: number[] = [];
  private interval: NodeJS.Timer;

  basicWeathers: Weather[] = [];

  constructor(
    private readonly weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.weatherToDisplay();

    this.interval = setInterval(() => {
      this.newRandomCities();
    }, 60000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  weatherToDisplay(): void {
    while (this.selectedCities.length < 3) {
      const id: number = this.weatherService.getRandomCity();
      if (!this.selectedCities.some(city => city === id)) {
        this.selectedCities.push(id)
        this.weatherService.getBasicWeather(id).subscribe(
          weather => {
            this.basicWeathers.push(weather)
          }
        )
      }
    }
  }

  newRandomCities(): void {
    if (!environment.production) {
      console.log('%c Draws 3 new cities', 'background: #222; color: #bada55; font-size: 16px;');
    }

    this.selectedCities.length = 0;
    this.basicWeathers.length = 0;
    this.weatherToDisplay()
  }

}
