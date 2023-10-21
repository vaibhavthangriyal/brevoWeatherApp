<br/>
<p align="center">
  <h3 align="center">Brevo Weather App</h3>

  <p align="center">
    Single app that gives forecast and weather condition of cities of France
    <br/>
    <br/>
    <a href="https://stupendous-boba-5c27e9.netlify.app">View Demo</a>
    .
  </p>
</p>



## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Internal working](#internal-workings)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

The "Brevo French Weather Forecast" app is a user-friendly, Angular-based application that provides real-time weather information for various cities across France. With a simple and intuitive user interface, this app allows users to effortlessly access accurate weather data for over 5000 locations.
### Special Features
Custom Dropdown with :: Pagination, Infinite scroll, Typeahead with highlight

## Built With

This application is build on Angular 16. With ZERO external libraries.

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* npm version 16 and above

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/virtualtechnoman/brevoWeatherApp.git
```

2. Install NPM packages

```sh
npm install
```

3. Start application

```JS
npm start
```

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

## Internal Workings

We have 
3 Services
  1. Forecast service
    1.  getForecastTillDate(lat: number, lon: number) : Used to get forecast of next 5 days of a city based on city's lat log.
    2.  getCurrentCondition(lat: number, lon: number) :  Used to get forecast of current day based on city's lat long
  2. City Service
    1.  getAllCities(page: number, pageSize: number) : Used to fetch paginated list of cities.
    2.  getFilteredData(searchString: string, page: number, pageSize: number) : Used to fetch paginated list of cities filtered my name that contains search string.
  3. Custom Toast Service.
    1.  openToast(toastMessage: string, toastType: 'error' | 'warning' | 'success' = 'success') : Used to open a custom toast with message and custom style.
2 individual components
  1. Custom Dropdown
  2. Toast component
  3. Notfound component.
1 Module
  1. Forecast Module

## Authors

* **Vaibhav Thangriyal** - *SDE@Flutin* **
