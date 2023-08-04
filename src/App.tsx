import { format } from "date-fns";
import { fi } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  HourlyData,
  WeatherData,
  useWeather,
  weatherCodeMap,
} from "./useWeather";
import { WeatherIcon } from "./WeatherIcon";

const App = () => {
  const [date, setDate] = useState(new Date());

  const weather = useWeather();

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 100000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
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
      {weather ? (
        <div className="weather-container">
          {Object.keys(weather).map((key) => (
            <WeatherDisplay
              data={weather[key as unknown as keyof WeatherData]}
            />
          ))}
        </div>
      ) : (
        <div>Lataa säätä...</div>
      )}
    </div>
  );
};

const WeatherDisplay = ({ data }: { data: HourlyData }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>{format(data.time, "H:mm")}</div>
      <div>{data.temperature.toFixed(1).replace(".", ",")} &#8451;</div>
      <div>
        <WeatherIcon description={weatherCodeMap[data.weatherCode]} />
      </div>
      <div>{weatherCodeMap[data.weatherCode]}</div>
    </div>
  );
};

export default App;
