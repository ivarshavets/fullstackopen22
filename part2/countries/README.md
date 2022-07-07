# Project Countries

## Tasks
Exercise [2.12-2.14](https://fullstackopen.com/en/part2/getting_data_from_server#exercises-2-11-2-14).
Create an application, in which one can look at data of various countries. The application should probably get the data from the endpoint [all](https://restcountries.com/v3.1/all).
1. The country to be shown is found by typing a search query into the search field. Edge cases (countries whose name appears in the name of another country, like South Sudan) are ignored.
- If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific
- If there are ten or fewer countries, but more than one, then all countries matching the query are shown
- When there is only one country matching the query, then the basic data of the country (eg. capital and area), its flag and the languages spoken there, are shown
2. When the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country
3. Add to the view showing the data of a single country, the weather report for the capital of that country. There are dozens of providers for weather data. One suggested API is https://openweathermap.org.
[Here](https://openweathermap.org/weather-conditions#Icon-list) is the description how to get weather icons from the Open weather map.

## Start the app
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Run the app with api-key
REACT_APP_API_KEY=process.env npm start 
