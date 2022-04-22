import React, { useState, useCallback } from 'react';
import './app.css';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import axios from 'axios';
function App() {
  const citiesToken = process.env.REACT_APP_CITIES_NAMES_API_KEY;
  const weatherToken = process.env.REACT_APP_WEATHER_DETAILS_API_KEY;
  const [show, setShow] = useState(false);
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherResponseData, setWeatherResponseData] = useState('');

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
        // alert('Enter city name');
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
            {show && (
              <div className='card'>
                <div className='location'>
                  <HiOutlineLocationMarker className='location__icon' />
                  <h4>{weatherResponseData.name}</h4>
                </div>

                <h1>
                  33<span>&#176;</span>
                  <small>C</small>
                </h1>
                <h5>Sunny</h5>
                <h5>Monday | 19-08-22 | 12:53</h5>
                <div className='weather__forecast'>
                  <div className='weather__forecast__details'>
                    <h4>Percipitation: 10%</h4>
                    <h4>Humidity: 60%</h4>
                    <h4>Wind: 23km/h</h4>
                  </div>
                  <div className='weather__forecast__future'>
                    <h5>Tuesday</h5>
                    <div className='weather__forecast__future__temp'>
                      33<span>&#176;</span>
                      <small>C</small>
                    </div>
                  </div>
                  <hr className='horizontal-line' />
                  <div className='weather__forecast__future'>
                    <h5>Wednesday</h5>
                    <div className='weather__forecast__future__temp'>
                      33<span>&#176;</span>
                      <small>C</small>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default App;
//finally first commit done
