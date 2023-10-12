import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
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
  @HostListener('window:scroll', [])
  onScroll(): void {
    // Check if the user has scrolled to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      this.getAllCities(); // If yes, load more city data
    }
  }

  allCities: City[] = []; // Initialize an array to store city data
  currentPage = 1; // Initialize the current page for pagination
  currentCondition: any; // Initialize the current weather condition
  foreCastData: any = []; // Initialize an array to store forecast data
  foreCastDays: number = 3; // Define the number of forecast days
  pageSize = 50; // Define the number of cities to fetch per page
  showLoader: boolean = true; // A flag to show a loader while data is being fetched
  selectedCity: any; // Initialize the selected city

  constructor(private customToastService: CustomToastService, private cityService: CityService, private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.getAllCities();
  }

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
      this.customToastService.openToast('error', 'something went wrong');
      throw error;
    }
  }

  async changeCity(city: City) {
    try {
      // Change the selected city and fetch its data
      this.selectedCity = city;
      this.foreCastData = await this.getForeCast();
    } catch (error) {
      // Handle and display an error if fetching data fails
      this.customToastService.openToast('error', 'something went wrong');
      throw error;
    }
  }

  async getForeCast() {
    try {
      // Fetch the forecast data for the selected city
      const allForecast = await this.forecastService.getForecastTillDate(this.selectedCity.lat, this.selectedCity.lon).toPromise();

      const lastElemet = allForecast.list[allForecast.list.length - 1]; //Get last date from fetched data
      const firstDate = moment().add(1, 'day'); //
      const lastDate = moment(lastElemet.dt * 1000);

      const newArray = new Array(lastDate.diff(firstDate, 'days') + 1);
      for (let index = 0; index < allForecast.list.length; index++) {
        const element = allForecast.list[index];
        const currentDate = moment();
        const newDate = moment(element.dt * 1000);

        const diff = newDate.diff(currentDate, 'days');
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

  async getCurrentConditions() {
    try {
      let res: any = await this.forecastService.getCurrentCondition(this.selectedCity.lat, this.selectedCity.lon).toPromise();
      res.className = `wi wi-icon-${res.weather[0].id}`;
      return res;
    } catch (error) {
      throw error;
    }
  }

  async fetchData() {
    try {
      this.showLoader = true;
      this.currentCondition = await this.getCurrentConditions();
      this.foreCastData = await this.getForeCast();
      this.showLoader = false;
    } catch (error) {
      this.customToastService.openToast('error', 'something went wrong');
      throw error;
    }
  }
}
