import React from "react";

function Daycard({ date, temperature, icon }) {
  return (
    <div className="col-lg-2 col-md-5 p-2 my-2 my-lg-0 day-card text-center">
      <p>{date}</p>
      <img
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        width="95px"
        alt=""
      />
      <br />
      <br />
      <p>{temperature} °C</p>
    </div>
  );
}

export default Daycard;
