import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Weather } from '../core/models/basic-weather';
import { WeatherService } from '../core/services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  @Input() basicWeatherData: Weather;
  private interval: NodeJS.Timer;
  readonly imgUrl: string[] = ['https://openweathermap.org/img/wn/', '@2x.png'];


  constructor(
    private readonly weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.refreshData();
    }, 10000);

  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshData(): void {
    if (!environment.production) {
      console.log('%c Refresh data', 'color: #1a3cbb; font-size: 16px;');
    }

    this.weatherService.getBasicWeather(this.basicWeatherData.cityID).subscribe(
      weather => {
        this.basicWeatherData = weather;
      }
    )

  }

  openDetails(): void {
    const url = 'https://openweathermap.org/city/'
    window.open(url + this.basicWeatherData.cityID, "_blank");
  }
}
