import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Daycard from "./components/Daycard";

import Axios from "axios";

function App() {
  // for days information
  const [days, setDays] = useState([
    {
      dt: 1655931600,
      main: {
        temp: 298.85,
        feels_like: 299.46,
        temp_min: 298.85,
        temp_max: 300.04,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 944,
        humidity: 76,
        temp_kf: -1.19,
      },
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10n",
        },
      ],
      clouds: {
        all: 78,
      },
      wind: {
        speed: 2.47,
        deg: 260,
        gust: 4.34,
      },
      visibility: 10000,
      pop: 0.4,
      rain: {
        "3h": 0.31,
      },
      sys: {
        pod: "n",
      },
      dt_txt: "2022-06-22 21:00:00",
    },
  ]);
  // location
  const [location, setLocation] = useState({});
  // search value
  const [search, setSearch] = useState("");
  // for reference use use this key
  let apiKey = "c191b05a0f26393e62f30d19a64d270b";
  const fetchdata = async (city = "indore") => {
    const { data } = await Axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=${apiKey}`
    );
    const value = data;
    setDays(value.list);
    setLocation(value.city);
  };

  // search
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = search;
    fetchdata(data);
    setSearch("");
  };

  // for first load up call
  useEffect(() => {
    fetchdata();
  }, []);

  // for direction
  const direction = (val) => {
    const dir = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
      "N",
    ];
    return dir[val];
  };

  // return
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 search p-5">
          {/* <!-- search  --> */}
          <div className="d-flex align-items-center justify-content-between">
            <input
              type="text"
              placeholder="Search for place"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn mx-2" onClick={handleSubmit}>
              Search
            </button>
          </div>
          {/* <!-- content --> */}
          {/* <!-- image --> */}
          <div className="mt-5 pt-5 text-center">
            <img
              src={`http://openweathermap.org/img/wn/${days[0].weather[0].icon}@2x.png`}
              width="140"
              alt=""
            />
          </div>
          {/* <!-- temperature  --> */}
          <div className="text-center my-5">
            <h1>{parseInt(days[0].main.temp - 273.15)} °C</h1>
          </div>
          {/* <!-- type  --> */}
          <h5 className="text-center my-5">{days[0].weather[0].description}</h5>
          {/* <!-- day and location  --> */}
          <div className="mx-5 pt-5 text-center">
            <p>Today . {Date(days[0].dt).slice(0, 10)}</p>
            <p>{location.name}</p>
            <p>{location.country}</p>
          </div>
        </div>
        {/* <!-- details section  --> */}
        <div className="col-lg-9 details">
          <div className="m-md-5 my-sm-0 my-3">
            {/* <!-- day cards  --> */}
            <div className="row d-flex justify-content-between mx-5">
              {/* card conditional rendering   */}
              {days.map((day) => {
                return (
                  <Daycard
                    date={day.dt_txt.slice()}
                    temperature={parseInt(day.main.temp - 273.15)}
                    icon={day.weather[0].icon}
                  />
                );
              })}
            </div>
            {/* <!-- highlights  --> */}
            <div className="mt-5 highlights mx-5">
              <h4 text-white>Today's Highlights</h4>
              {/* <!-- highlight-card  --> */}
              {/* <!-- sec -1 --> */}
              <div className="row d-flex justify-content-around my-lg-3">
                {/* <!-- wind  --> */}
                <div className="col-md-5 my-lg-0 my-3 bb highlight-card p-3">
                  <div className="text-center">
                    <p>Wind Status</p>
                    <h4>
                      <span className="head">{days[0].wind.speed}</span>mph
                    </h4>
                    <p>
                      {direction(
                        Math.floor(days[0].wind.deg / 21.176470588235) - 1
                      )}
                    </p>
                  </div>
                </div>
                {/* <!-- Humidity --> */}
                <div className="col-md-5 my-lg-0 my-3 highlight-card p-3">
                  <div className="text-center">
                    <p>Humidity</p>
                    <h4>
                      <span className="head">{days[0].main.humidity}</span>
                      <b>%</b>
                    </h4>
                    <progress id="file" value={days[0].main.humidity} max="100">
                      32%
                    </progress>
                  </div>
                </div>
              </div>
              {/* <!-- sec-2  --> */}
              <div className="row d-flex justify-content-around my-lg-3">
                {/* <!-- visiblity  --> */}
                <div className="col-md-5 my-lg-0 my-3 highlight-card p-3">
                  <div className="text-center">
                    <p>Visiblity</p>
                    <h3>
                      <span className="head">
                        {parseFloat(days[0].visibility * 0.000621371).toFixed(
                          2
                        )}
                      </span>
                      miles
                    </h3>
                  </div>
                </div>
                {/* <!-- air pressure  --> */}
                <div className="col-md-5 my-lg-0 my-3 highlight-card p-3">
                  <div className="text-center">
                    <p>Air Pressure</p>
                    <h3>
                      <span className="head">{days[0].main.pressure}</span>mb
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
// application made by your truly brainy_clicks
