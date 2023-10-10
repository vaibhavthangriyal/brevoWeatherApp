import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import * as moment from 'moment';
import { City } from 'src/app/models/city';
import { CityService } from 'src/app/services/city.service';
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
  selectedCity: any;
  pageSize = 20;
  currentPage = 1;

  constructor(
    private cityService: CityService,
    private forecastService: ForecastService,
  ) {}

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities() {
    try {
      this.cityService
        .getAllCities(this.currentPage, this.pageSize)
        .subscribe((res) => {
          this.allCities = [...this.allCities, ...res]; // Append new data to existing data
          this.currentPage++;
          if (!this.selectedCity) {
            this.selectedCity = this.allCities[0];
            this.getForCast();
          }
        });
    } catch (error) {}
  }

  getForCast() {
    try {
      this.forecastService
        .getForecastTillDate(this.selectedCity.lat, this.selectedCity.lon)
        .subscribe(
          (res) => {
            console.log('RES', res.list);
            const groupedArray = [];
            for (let i = 0; i < res.list.length; i += 8) {
              console.log(i)
              groupedArray.push(res.list.slice(i, i + 8));
            }
            console.log('gro', groupedArray)
          },
          (error: HttpErrorResponse) => {
            console.log('ERROR', error);
          },
        );
    } catch (error) {
      console.error(``, error);
    }
  }


}
