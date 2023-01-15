import { WeatherCondition } from "./weather";

export interface Weather {
  cityID: number;
  city: string;
  temp: string;
  weather: WeatherCondition[];

}