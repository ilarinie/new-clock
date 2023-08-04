import { useEffect, useState } from "react";
import { useGeolocation } from "./useGeolocation";
import axios from "axios";
import { isSameDay } from "date-fns";

type WeatherCode =
  | 0
  | 1
  | 2
  | 3
  | 45
  | 48
  | 51
  | 53
  | 55
  | 56
  | 57
  | 61
  | 63
  | 65
  | 66
  | 67
  | 71
  | 73
  | 75
  | 77
  | 80
  | 81
  | 82
  | 85
  | 86
  | 95;
export type WeatherDescription =
  | "Selkeää"
  | "Enimmäkseen selkeää"
  | "Puolipilvistä"
  | "Pilvistä"
  | "Sumua"
  | "Depositing rime fog"
  | "Kevyttä tihkusadetta"
  | "Tihkusadetta"
  | "Voimakasta tihkusadetta"
  | "Kevyttä jäistä tihkusadetta"
  | "Jäistä tihkusadetta"
  | "Kevyttä sadetta"
  | "Sadetta"
  | "Voimakasta sadetta"
  | "Jäistä sadetta"
  | "Voimakasta jäistä sadetta"
  | "Kevyttä lumisadetta"
  | "Lumisadetta"
  | "Voimakasta lumisadetta"
  | "Lumikauraa"
  | "Kevyitä sadekuuroja"
  | "Sadekuuroja"
  | "Voimakkaita sadekuuroja"
  | "Kevyitä lumikuuroja"
  | "Voimakkaita lumikuuroja"
  | "Ukkosta"
  | "Voimakasta ukkosta";

export const weatherCodeMap: Record<WeatherCode, WeatherDescription> = {
  0: "Selkeää",
  1: "Enimmäkseen selkeää",
  2: "Puolipilvistä",
  3: "Pilvistä",
  45: "Sumua",
  48: "Depositing rime fog",
  51: "Kevyttä tihkusadetta",
  53: "Tihkusadetta",
  55: "Voimakasta tihkusadetta",
  56: "Kevyttä jäistä tihkusadetta",
  57: "Jäistä tihkusadetta",
  61: "Kevyttä sadetta",
  63: "Voimakasta sadetta",
  65: "Jäistä sadetta",
  66: "Voimakasta jäistä sadetta",
  67: "Kevyttä lumisadetta",
  71: "Lumisadetta",
  73: "Voimakasta lumisadetta",
  75: "Lumikauraa",
  77: "Kevyitä sadekuuroja",
  80: "Sadekuuroja",
  81: "Voimakkaita sadekuuroja",
  82: "Kevyitä lumikuuroja",
  85: "Voimakkaita lumikuuroja",
  86: "Ukkosta",
  95: "Voimakasta ukkosta",
};

type WeatherResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: "GMT";
  timezone_abbreviation: "GMT";
  elevation: number;
  hourly_units: {
    time: "iso8601";
    temperature_2m: "°C";
    weathercode: "wmo code";
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: WeatherCode[];
  };
};

export type HourlyData = {
  temperature: number;
  weatherCode: WeatherCode;
  time: Date;
};

export type WeatherData = {
  9: HourlyData;
  17: HourlyData;
  22: HourlyData;
};

const findIndexForHour = (hour: number, times: string[]): number => {
  return times.findIndex((time) => {
    return (
      isSameDay(new Date(time), new Date()) &&
      new Date(time).getHours() === hour
    );
  });
};

export const useWeather = () => {
  const [weather, setWeather] = useState(undefined as undefined | WeatherData);

  const { latitude, longitude } = useGeolocation();

  const parseWeatherResponse = (response: WeatherResponse): WeatherData => {
    const nineIndex = findIndexForHour(9, response.hourly.time);
    const seventeenIndex = findIndexForHour(17, response.hourly.time);
    const twentytwoIndex = findIndexForHour(22, response.hourly.time);

    return {
      9: {
        temperature: response.hourly.temperature_2m[nineIndex],
        weatherCode: response.hourly.weathercode[nineIndex],
        time: new Date(response.hourly.time[nineIndex]),
      },
      17: {
        temperature: response.hourly.temperature_2m[seventeenIndex],
        weatherCode: response.hourly.weathercode[seventeenIndex],
        time: new Date(response.hourly.time[seventeenIndex]),
      },
      22: {
        temperature: response.hourly.temperature_2m[twentytwoIndex],
        weatherCode: response.hourly.weathercode[twentytwoIndex],
        time: new Date(response.hourly.time[twentytwoIndex]),
      },
    };
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const resp = await axios.get<WeatherResponse>(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&timezone=auto`
      );
      setWeather(parseWeatherResponse(resp.data));
    };
    fetchWeather();
  }, [latitude, longitude]);

  return weather;
};
