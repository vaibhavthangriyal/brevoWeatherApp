import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  jsonFilePath = '../../assets/cities-fr.json';

  constructor(private http: HttpClient) {}

  getAllCities(page: number, pageSize: number): Observable<City[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.http
      .get<City[]>(this.jsonFilePath)
      .pipe(map((data) => data.slice(startIndex, endIndex)));
  }
}
