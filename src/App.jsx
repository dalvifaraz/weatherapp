import React, { useState, useCallback } from 'react';
import './app.css';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
function App() {
  const citiesToken = process.env.REACT_APP_CITIES_NAMES_API_KEY;
  const weatherToken = process.env.REACT_APP_WEATHER_DETAILS_API_KEY;
  const [show, setShow] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherResponseData, setWeatherResponseData] = useState('');

  var temp = Math.round(weatherResponseData.main.temp - 273.15);
  var daylist = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday ',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var currentdate = new Date();
  var datetime =
    daylist[currentdate.getDay()] +
    ' | ' +
    currentdate.getDate() +
    '-' +
    (currentdate.getMonth() + 1) +
    '-' +
    currentdate.getFullYear() +
    ' | ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  var nextDay = currentdate.getDay() + 1;

  function citySelect(e) {
    setSelectedCity('');
    setCity([]);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${e.target.innerText}&appid=${weatherToken}`
      )
      .then((res) => {
        const data = res.data;
        setWeatherResponseData(data);
      });
    setShow(true);
  }

  function clearButton() {
    setSelectedCity('');
    setShow(false);
  }

  async function citiesResponseData(e) {
    try {
      if (e.target.value.length === 0) {
        setCity([]);
        return;
      }
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${citiesToken}&q=${e.target.value}`
      );
      const data = response.data;
      const cityNames = data.map((city) => city.LocalizedName);
      setCity(cityNames);
    } catch (e) {
      console.log(e);
    }
  }

  function trailingDebounce(func, delay) {
    let timeoutId;
    let context = this;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        // timeoutId = null;
        func.apply(context, args);
      }, delay);
    };
  }

  // eslint-disable-next-line
  const optimisedAutoComplete = useCallback(
    trailingDebounce(citiesResponseData, 400),
    []
  );

  function autoComplete(e) {
    setShow(false);
    setSelectedCity(e.target.value);
    optimisedAutoComplete(e);
  }
  return (
    <React.Fragment>
      <section id=''>
        <div className='container weatherapp__container'>
          <div className='weatherapp'>
            <h3>Weather Application</h3>
            <button
              type='button'
              onClick={clearButton}
              className='btn btn-primary clear'
            >
              Clear
            </button>
            <div className='dropdown'>
              <input
                className={city.length > 0 ? 'input-border' : undefined}
                value={selectedCity}
                type='text'
                name='search'
                placeholder='Enter your city name'
                required
                onChange={autoComplete}
              />
              <div
                className={
                  city.length === 0 ? 'display-none' : 'dropdown-content'
                }
              >
                {city.map((city, index) => {
                  return (
                    <li key={index} onClick={citySelect}>
                      <small>{city}</small>
                    </li>
                  );
                })}
              </div>
            </div>
            {show &&
              (weatherResponseData ? (
                <div className='card'>
                  <div className='location'>
                    <HiOutlineLocationMarker className='location__icon' />
                    <h4>{weatherResponseData.name}</h4>
                  </div>

                  <h1>
                    {temp}
                    <span>&#176;</span>
                    <small>C</small>
                  </h1>
                  <h5>{weatherResponseData.weather[0].main}</h5>
                  <h5>{datetime}</h5>
                  <div className='weather__forecast'>
                    <div className='weather__forecast__details'>
                      <h4>Pressure: {weatherResponseData.main.pressure}mbar</h4>
                      <h4>Humidity: {weatherResponseData.main.humidity}%</h4>
                      <h4>Wind: {weatherResponseData.wind.speed}km/h</h4>
                    </div>
                    <div className='weather__forecast__future'>
                      <h5>
                        {nextDay > 6
                          ? daylist[(nextDay % 6) - 1]
                          : daylist[nextDay]}
                      </h5>
                      <div className='weather__forecast__future__temp'>
                        {temp + 2}
                        <span>&#176;</span>
                        <small>C</small>
                      </div>
                    </div>
                    <hr className='horizontal-line' />
                    <div className='weather__forecast__future'>
                      <h5>
                        {nextDay > 6
                          ? daylist[nextDay % 6]
                          : daylist[nextDay + 1]}
                      </h5>
                      <div className='weather__forecast__future__temp'>
                        {temp + 1}
                        <span>&#176;</span>
                        <small>C</small>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // 'Loading...'
                <Box sx={{ display: 'flex' }}>
                  <CircularProgress />
                </Box>
              ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default App;
//finally first commit done
