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

## Approach

  ### Default Flow
  #### App loads -> FeatureModule Lazy Loaded -> Component is Loaded -> Api to fetch cities is called -> First object is selected as selectedCity -> getCurrentConditions() and getForeCast() is called to fetch forecast

  ### City is changed from drop down
  #### fetchData() is called to call both APIs for selected city.

  ### Dropdown is scrolled to bottom
  #### Once dropdown is scrolled to bottom, getAllCities() is called with next page, that fetches next 50 cities

  ### Text is entered in search field.
  #### getFilteredData() is called with next page (filtered search), that fetches next 50 cities filtered by name that includes the search string.


## Internal Workings
We have 
### 3 Services
  #### Forecast service
    getForecastTillDate(lat: number, lon: number) : Used to get forecast of next 5 days of a city based on city's lat log.
    getCurrentCondition(lat: number, lon: number) :  Used to get forecast of current day based on city's lat long
  #### City Service
    getAllCities(page: number, pageSize: number) : Used to fetch paginated list of cities.
    getFilteredData(searchString: string, page: number, pageSize: number) : Used to fetch paginated list of cities filtered my name that contains search string.
  #### Custom Toast Service.   
    openToast(toastMessage: string, toastType: 'error' | 'warning' | 'success' = 'success') : Used to open a custom toast with message and custom style.
### Individual components
  #### Custom Dropdown
    onClick($event) : This event is used to check if we have clicked inside of dropdown component, if not then hide dropdown
    onScroll() : This event is used to check if we have reached bottom of dropdown, if yes, then emit event to parent component.
    selectOption() : This event is emites, selected option from dropdown to parent component.
    search() : This event emits, search string to parent component.
    highlightSearchString() : This method, highlights the searched string in options list.
  #### Toast component
    
  #### Notfound component.
    Shows 404 not found page, when user goes to unlisted url.

### Module
  #### Forecast Module
  ##### Forecast component
      getAllCities() : Call api to get all cities, in paginated form.
      getFilteredCities(searchString) : call api to fetch cities based on search string.
      changeCity(city) : call api and fetch forecast based on selected city.
      getForeCast() : Call api to get forecast of next 5 days
      getCurrentConditions() :  Call api to get same day forecast
      fetchData() : Get same day forecast as well as forecast of next 3 days.
      getMoreCities() : Calls api to get cities from next pagination page, based on search string, if search string is present, then fetch filtered cities else fetch all cities

## Authors

* **Vaibhav Thangriyal** - *SDE@Flutin* **
