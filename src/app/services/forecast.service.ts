import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  baseUrl = 'https://api.openweathermap.org/data/2.5/';
  apiKey = environment.openweathermap.api;
  constructor(private http: HttpClient) { }

  /**
   * The function `getForecastTillDate` retrieves the weather forecast for a specific latitude and
   * longitude.
   * @param {number} lat - The latitude of the location for which you want to get the forecast.
   * @param {number} lon - longitude of the location
   * @returns an Observable<any>.
   */
  getForecastTillDate(lat: number, lon: number): Observable<any> {
    const url = `forecast/?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get(this.baseUrl + url).pipe((data) => data);
  }

  /**
   * The function `getCurrentCondition` retrieves the current weather condition based on latitude and
   * longitude coordinates.
   * @param {number} lat - The "lat" parameter represents the latitude of a location. Latitude is a
   * geographic coordinate that specifies the north-south position of a point on the Earth's surface.
   * @param {number} lon - The `lon` parameter represents the longitude coordinate of a location. It is
   * a numerical value that specifies the east-west position of a point on the Earth's surface.
   * @returns an Observable object.
   */
  getCurrentCondition(lat: number, lon: number) {
    const url = `weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
    return this.http.get(this.baseUrl + url).pipe((data) => data);
  }
}
