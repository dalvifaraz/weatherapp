import React, { useState, useEffect } from 'react';
import './app.css';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import axios from 'axios';
function App() {
  const [show, setShow] = useState(false);
  const [city, setCity] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios
      .get(
        `http://dataservice.accuweather.com/locations/v1/topcities/150?apikey=cSPKvptssiz1W3Mo6PQg9msgJpaX4v9S`
      )
      .then((res) => {
        const data = res.data;
        const city = data.map((x) => x.LocalizedName);
        setCity(city);
      });
  });
  return (
    <React.Fragment>
      <section id=''>
        <div className='container weatherapp__container'>
          <div className='weatherapp'>
            <h3>Weather Application</h3>
            <button
              type='button'
              onClick={() => setShow(false)}
              className='btn btn-primary clear'
            >
              Clear
            </button>
            <form action=''>
              <input
                type='search'
                name='search'
                placeholder='Enter your city name'
                required
                onChange={(event) => setQuery(event.target.value)}
              />
              <div>
                {city.map((x) => {
                  <h5>{x}</h5>;
                })}
              </div>
              <button
                type='submit'
                onClick={() => setShow(true)}
                className='btn btn-primary'
              >
                Submit
              </button>
            </form>
            {show && (
              <div className='card'>
                <div className='location'>
                  <HiOutlineLocationMarker className='location__icon' />
                  <h4>Mumbai</h4>
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
