import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  jsonFilePath = '../../assets/cities-fr.json';

  constructor(private http: HttpClient) { }

  /**
   * The function `getAllCities` retrieves a subset of cities from a JSON file based on the specified
   * page and page size.
   * @param {number} page - The page parameter represents the current page number that you want to
   * retrieve from the list of cities.
   * @param {number} pageSize - The pageSize parameter determines the number of cities to be returned
   * per page. It specifies the maximum number of cities that should be included in the result set.
   * @returns an Observable of type City[].
   */
  getAllCities(page: number, pageSize: number): Observable<City[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.http
      .get<City[]>(this.jsonFilePath)
      .pipe(map((data) => data.slice(startIndex, endIndex)));
  }


  /**
   * The function `getFilteredData` takes in a search string, page number, and page size, and returns
   * an observable that emits a filtered subset of data based on the search string and pagination
   * parameters.
   * @param {string} searchString - The `searchString` parameter is a string that is used to filter the
   * data. It is used to search for items whose `nm` property includes the `searchString`.
   * @param {number} page - The page parameter represents the current page number of the data you want
   * to retrieve. It is used to calculate the start and end indexes of the filtered items to be
   * returned.
   * @param {number} pageSize - The `pageSize` parameter determines the number of items to be displayed
   * on each page of the filtered data.
   * @returns an Observable of type 'any'.
   */
  getFilteredData(searchString: string, page: number, pageSize: number): Observable<any> {
    return this.http.get<City[]>(this.jsonFilePath).pipe(
      map(items => items.filter(item => item.nm.includes(searchString))),
      map(filteredItems => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return filteredItems.slice(startIndex, endIndex);
      })
    )
  }
}
