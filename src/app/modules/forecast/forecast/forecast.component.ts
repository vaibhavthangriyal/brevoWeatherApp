import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
import { CustomToastService } from 'src/app/services/custom-toast.service';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  allCities: City[] = []; // Initialize an array to store city data
  currentPage = 1; // Initialize the current page for pagination
  currentCondition: any; // Initialize the current weather condition
  filteredPagination = {
    pageSize: 50,
    currentPage: 1
  };
  foreCastData: any = []; // Initialize an array to store forecast data
  foreCastDays: number = 3; // Define the number of forecast days
  pageSize = 50; // Define the number of cities to fetch per page
  showLoader: boolean = true; // A flag to show a loader while data is being fetched
  selectedCity: any; // Initialize the selected city
  searchQuery: string = '';

  constructor(private cityService: CityService, private forecastService: ForecastService) { }

  ngOnInit(): void {
    this.getAllCities();
  }

  /**
   * The function fetches a batch of city data from a service, appends it to the existing city data,
   * sets the first city as the selected one if no city is selected, and fetches its data.
   */
  getAllCities() {
    try {
      // Fetch a batch of city data from the service
      this.cityService.getAllCities(this.currentPage, this.pageSize).subscribe((res) => {
        // Append the new data to the existing city data
        this.allCities = [...this.allCities, ...res];
        this.currentPage++;
        // If no city is selected, set the first city as the selected one and fetch its data
        if (!this.selectedCity) {
          this.selectedCity = this.allCities[0];
          this.fetchData();
        }
      });
    } catch (error) {
      // Handle and display an error if fetching data fails
      throw error;
    }
  }

  /**
   * The function `getFilteredCities` fetches a batch of city data from a service based on a search
   * query and appends it to the existing city data.
   * @param {any} searchQuery - The search query is a parameter that represents the user's input for
   * filtering the cities. It can be any type of data, such as a string or an object, depending on how
   * the filtering functionality is implemented in the city service.
   */
  getFilteredCities(searchQuery: any) {
    try {
      this.searchQuery = searchQuery;
      // Fetch a batch of city data from the service
      this.cityService.getFilteredData(searchQuery, this.filteredPagination.currentPage, this.filteredPagination.pageSize).subscribe((res) => {
        this.allCities = [...this.allCities, ...res]; // Append the new data to the existing city data
        this.filteredPagination.currentPage++;
        this.allCities = this.allCities.sort((a: any, b: any) => b.nm - a.nm)
      });
    } catch (error) {

    }
  }

  /**
   * The function changes the selected city and fetches its forecast data, handling and displaying an
   * error if fetching data fails.
   * @param {City} city - The "city" parameter is an object of type "City" that represents the city that
   * the user wants to change to.
   */
  async changeCity(city: City) {
    try {
      // Change the selected city and fetch its data
      this.selectedCity = city;
      this.foreCastData = await this.getForeCast();
    } catch (error) {
      // Handle and display an error if fetching data fails
      throw error;
    }
  }

  /* The `getForeCast()` function is an asynchronous function that fetches the forecast data for the
  selected city. It makes an API call to the `forecastService` to get the forecast data and then
  processes the data to create a new array with the maximum and minimum temperatures for each day. The
  function calculates the number of days between the current date and the last date in the forecast
  data, creates an array with the length equal to the number of days, and populates the array with the
  maximum and minimum temperatures for each day. The function also includes other properties such as
  the date, weather condition, weather icon class name, count, and description for each day. Finally,
  the function returns the new array with the forecast data. */
  async getForeCast() {
    try {
      // Fetch the forecast data for the selected city
      const allForecast = await this.forecastService.getForecastTillDate(this.selectedCity.lat, this.selectedCity.lon).toPromise();

      const lastElemet = allForecast.list[allForecast.list.length - 1]; //Get last date from fetched data
      const firstDate = new Date().setDate(new Date().getDate() + 1); //
      const lastDate = lastElemet.dt * 1000;
      const totalDays = Math.ceil(((lastDate - firstDate) / (1000 * 60 * 60 * 24)));
      const newArray = new Array(totalDays);
      for (let index = 0; index < allForecast.list.length; index++) {
        const element = allForecast.list[index];
        const currentDate = new Date().valueOf();
        const newDate = element.dt * 1000;
        const diff = Math.ceil((newDate - currentDate) / (1000 * 60 * 60 * 24))

        if (newArray[diff - 1]) {
          newArray[diff - 1] = {
            max: newArray[diff - 1].max < element.main.temp_max ? element.main.temp_max : newArray[diff - 1].max,
            min: newArray[diff - 1].min > element.main.temp_min ? element.main.temp_min : newArray[diff - 1].min,
            date: new Date(element.dt * 1000),
            weather: element.weather[0].id,
            className: `wi wi-icon-${element.weather[0].id}`,
            count: newArray[diff - 1].count + 1,
            description: element.weather[0].description,
          };
        } else {
          newArray[diff - 1] = {
            max: element.main.temp_max,
            min: element.main.temp_min,
            date: new Date(element.dt * 1000),
            weather: element.weather[0].id,
            className: `wi wi-icon-${element.weather[0].id}`,
            count: 1,
            description: element.weather[0].description,
          };
        }
      }
      return newArray;
      // Return the calculated forecast data
    } catch (error) {
      throw error;
    }
  }

  /**
   * The function `getCurrentConditions` is an asynchronous function that retrieves the current weather
   * conditions for a selected city using the `forecastService` and returns the result.
   * @returns the result of the API call to get the current weather conditions for the selected city. The
   * result is an object that includes the weather information and a className property that is set based
   * on the weather condition.
   */
  async getCurrentConditions() {
    try {
      let res: any = await this.forecastService.getCurrentCondition(this.selectedCity.lat, this.selectedCity.lon).toPromise();
      res.className = `wi wi-icon-${res.weather[0].id}`;
      return res;
    } catch (error) {
      throw error;
    }
  }

  /**
   * The above function is an asynchronous function that fetches current conditions and forecast data,
   * while also handling errors and updating the loader status.
   */
  async fetchData() {
    try {
      this.showLoader = true;
      this.currentCondition = await this.getCurrentConditions();
      this.foreCastData = await this.getForeCast();
      this.showLoader = false;
    } catch (error) {
      throw error;
    }
  }

  /**
   * The function `getMoreCities` sorts the `allCities` array in descending order based on the `nm`
   * property, and then either filters the cities based on a search query or retrieves all cities if no
   * search query is provided.
   */
  async getMoreCities() {
    try {
      this.allCities = this.allCities.sort((a: any, b: any) => b.nm - a.nm)
      if (this.searchQuery.length) this.getFilteredCities(this.searchQuery)
      else this.getAllCities();
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}
