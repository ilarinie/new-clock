import {
  WiCloudy,
  WiDayCloudy,
  WiDayRainMix,
  WiDaySleet,
  WiDaySprinkle,
  WiDaySunny,
  WiDaySunnyOvercast,
  WiFog,
  WiHail,
  WiRain,
  WiRainMix,
  WiSnow,
  WiSnowWind,
  WiSprinkle,
  WiThunderstorm,
} from "react-icons/wi";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { WeatherDescription } from "./useWeather";

export const WeatherIcon = (props: { description: WeatherDescription }) => {
  const render = () => {
    switch (props.description) {
      case "Selkeää":
        return <WiDaySunny />;
      case "Enimmäkseen selkeää":
        return <WiDaySunnyOvercast />;
      case "Puolipilvistä":
        return <WiDayCloudy />;
      case "Pilvistä":
        return <WiCloudy />;
      case "Sumua":
        return <WiFog />;
      case "Depositing rime fog":
        return <WiFog />;
      case "Kevyttä tihkusadetta":
        return <WiDayRainMix />;
      case "Tihkusadetta":
        return <WiRainMix />;
      case "Voimakasta tihkusadetta":
        return <WiDaySprinkle />;
      case "Kevyttä jäistä tihkusadetta":
        return <WiDaySleet />;
      case "Jäistä tihkusadetta":
        return <WiHail />;
      case "Kevyttä sadetta":
        return <WiRainMix />;
      case "Voimakasta sadetta":
        return <WiRain />;
      case "Jäistä sadetta":
        return <WiHail />;
      case "Voimakasta jäistä sadetta":
        return <WiHail />;
      case "Kevyttä lumisadetta":
        return <WiSnow />;
      case "Lumisadetta":
        return <WiSnow />;
      case "Voimakasta lumisadetta":
        return <WiSnowWind />;
      case "Lumikauraa":
        return <WiSnowWind />;
      case "Kevyitä sadekuuroja":
        return <WiSprinkle />;
      case "Sadekuuroja":
        return <WiSprinkle />;
      case "Voimakkaita sadekuuroja":
        return <WiSprinkle />;
      case "Kevyitä lumikuuroja":
        return <WiSnow />;
      case "Voimakkaita lumikuuroja":
        return <WiSnow />;
      case "Ukkosta":
        return <WiThunderstorm />;
      case "Voimakasta ukkosta":
        return <WiThunderstorm />;

      default:
        return <AiOutlineFileUnknown />;
    }
  };

  return render();
};
