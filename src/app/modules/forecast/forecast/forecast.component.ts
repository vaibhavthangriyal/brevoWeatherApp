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
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      this.getAllCities();
    }
  }

  allCities: City[] = [];
  currentPage = 1;
  currentCondition: any;
  foreCastData: any = [];
  foreCastDays: number = 3;
  pageSize = 50;
  showLoader: boolean = true;
  selectedCity: any;

  constructor(private customToastService: CustomToastService, private cityService: CityService, private forecastService: ForecastService) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities() {
    try {
      this.cityService.getAllCities(this.currentPage, this.pageSize).subscribe((res) => {
        this.allCities = [...this.allCities, ...res]; // Append new data to existing data
        this.currentPage++;
        if (!this.selectedCity) {
          this.selectedCity = this.allCities[0];
          this.fetchData();
        }
      });
    } catch (error) {
      this.customToastService.openToast('error', 'something went wrong');
      throw error;
    }
  }

  async changeCity(city: City) {
    try {
      this.selectedCity = city;
      this.foreCastData = await this.getForeCast();
    } catch (error) {
      this.customToastService.openToast('error', 'something went wrong');
      throw error;
    }
  }

  async getForeCast() {
    try {
      const allForecast = await this.forecastService.getForecastTillDate(this.selectedCity.lat, this.selectedCity.lon).toPromise();

      const lastElemet = allForecast.list[allForecast.list.length - 1];
      const firstDate = new Date().getDate() + 1;
      const lastDate = new Date(lastElemet.dt * 1000).getDate();

      const newArray = new Array(lastDate - firstDate + 1);
      for (let index = 0; index < allForecast.list.length; index++) {
        const element = allForecast.list[index];
        const currentDate = new Date().getDate();
        const newDate = new Date(element.dt * 1000).getDate();
        const diff = newDate - currentDate;
        if (newArray[diff - 1]) {
          let max = newArray[diff - 1] > element.main.temp_max ? element.main.temp_max : newArray[diff - 1].max;
          let min = newArray[diff - 1].min > element.main.temp_min ? newArray[diff - 1].min : element.main.temp_min;
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
      this.customToastService.openToast('error','something went wrong');
      throw error;
    }
  }

  // pairAndCalculateAverages(data: any) {
  //   const groupedData = [];
  //   for (let i = 0; i < data.length; i += 8) {
  //     const group = data.slice(i, i + 8);

  //     // Calculate average temp_max and temp_min for the group
  //     const averageTempMax =
  //       group.reduce((sum: number, item: any) => sum + item.main.temp_max, 0) /
  //       group.length;
  //     const averageTempMin =
  //       group.reduce((sum: number, item: any) => sum + item.main.temp_min, 0) /
  //       group.length;
  //     const averageTemp =
  //       group.reduce((sum: number, item: any) => sum + item.main.temp, 0) /
  //       group.length;
  //     groupedData.push({ averageTemp, averageTempMax, averageTempMin, weather: });
  //   }

  //   return groupedData;
  // }
}
