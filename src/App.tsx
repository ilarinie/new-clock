import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState({
    minTemp: -2,
    maxTemp: 20,
    weather: "rainy",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    setWeather({
      minTemp: -2,
      maxTemp: 20,
      weather: "rainy",
    });

    console.log(weather.maxTemp);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="clock-container">
        {format(date, "H:mm", {
          locale: fi,
        })}
      </div>
      <div className="date-container">
        {format(date, "EEEE d. MMMM", {
          locale: fi,
        })}
      </div>
      {/* <div className="weather-container">
        {weather.minTemp} &#8451; {weather.maxTemp}
      </div> */}
    </>
  );
};

export default App;
